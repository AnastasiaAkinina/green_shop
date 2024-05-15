<script setup>
import { onMounted, provide, reactive, ref, watch, computed } from "vue";
import axios from "axios";
import Header from "./components/Header.vue";
import ShopInfo from "./components/ShopInfo.vue";
import CardList from "./components/CardList.vue";
import Drawer from "./components/Drawer.vue";

const items = ref([]);
const meta = ref({});
const drawerOpen = ref(false);
const cart = ref([]);
const total = ref(0);
const tax = ref();
const isCreatinOrder = ref(false);
const clickBox = ref(0);
const currentPage = ref(1);

// функция закрывает окошко корзины
const closeDrawer = () => {
  drawerOpen.value = false;
};
// функция открывает окошко корзины
const openDrawer = (carr) => {
  drawerOpen.value = true;
  cart.value.forEach((element) => {
    console.log(element.price);
    total.value = total.value + element.price;
  });
  tax.value = Math.round((total.value * 5) / 100);
};

const addToCart = (item) => {
  cart.value.push(item);
  item.isAdded = true;
};

//Если корзина пустая
const cartIsEmpty = computed(() => cart.value.length === 0);

// Кнопка сделать заказ серая(Disabled) если isCreatinOrder==true или корзина пустая
const cartButtonDisabled = computed(() => isCreatinOrder.value || cartIsEmpty.value);

// Удаляем товар из корзины(с помощью метода splice мы находим индекс этого item и
// удалить один элемент )
const removeFromCart = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1);
  item.isAdded = false;
};

const createOrder = async () => {
  try {
    isCreatinOrder.value = true;
    const { data } = await axios.post(`https://290dddb232f0bb1a.mokky.dev/orders`, {
      items: cart.value,
      total: total.value,
    });
    cart.value = [];

    return data;
  } catch (err) {
    console.log(err);
  } finally {
    isCreatinOrder.value = false;
  }
};

const onClickAdd = (item) => {
  if (!item.isAdded) {
    addToCart(item);
  } else {
    removeFromCart(item);
  }
};

const filters = reactive({
  sortBy: "title",
  searchQuert: "",
});

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value;
  console.log(filters.sortBy);
};

const onChangeSearchInput = (event) => {
  console.log(event);
  filters.searchQuert = event.target.value;

  console.log(filters.searchQuert);
};

const onClickPage = (page) => {
  currentPage.value = page;
};

const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy,
      page: currentPage.value,
      limit: 9,
    };
    if (filters.searchQuert) {
      params.title = `*${filters.searchQuert}*`;
    }

    // const { data } = await axios.get(`https://ad13137db9c00e1c.mokky.dev/items`, {
    //   params,
    // });
    const { data } = await axios.get(`https://ad13137db9c00e1c.mokky.dev/items`, {
      params,
    });
    meta.value = data.meta;
    items.value = data.items;
  } catch (err) {
    console.log(err);
  }
};

const fetchFavorites = async () => {
  try {
    // Запросили закладки
    const { data: favorites } = await axios.get(
      `https://a53f1be119cd0c4f.mokky.dev/favorites`
    );
    // Проходимся по каждому обьекту кроссовок и проверяем есть ли он внутри ресурса
    // favorites если есть значит он есть в закладках
    // (Нашли товар в закладках по parentId проверили что он равен item.id)
    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.parentId === item.id);
      // Если закладки нет, то вернем сам item
      if (!favorite) {
        return item;
      }
      // Если закладка есть, то мы вернем новый обьект
      // обновляем его состояние
      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite.id,
      };
    });
  } catch (err) {
    console.log(err);
  }
};

const addToFavorite = async (item) => {
  try {
    // Проверяем был ли добавлен этот товар
    if (!item.isFavorite) {
      // Если нет, то создаем этот товар
      const obj = {
        parentId: item.id,
      };
      item.isFavorite = true;
      const { data } = await axios.post(
        `https://a53f1be119cd0c4f.mokky.dev/favorites`,
        obj
      );

      // и прикручиваем ID
      item.favoriteId = data.id;
    }
    // Но если товар уже был добавлен в заклаки
    else {
      item.isFavorite = false;

      //то удаляем товар по Id item.isFavoriteId
      await axios.delete(
        `https://a53f1be119cd0c4f.mokky.dev/favorites/${item.favoriteId}`
      );
      item.favoriteId = null;
    }
  } catch (err) {
    console.log(err);
  }
};

onMounted(async () => {
  await fetchItems();
  await fetchFavorites();
});
watch(filters, fetchItems);
watch(currentPage, fetchItems);

watch(
  cart,
  () => {
    clickBox.value = cart.value.length;
  },
  {
    deep: true,
  }
);

provide("cart", {
  items,
  cart,
  closeDrawer,
  addToCart,
  removeFromCart,
  onChangeSearchInput,
});
</script>

<template>
  <Drawer
    v-if="drawerOpen"
    :total="total"
    :tax="tax"
    @create-order="createOrder"
    :button-disabled="cartButtonDisabled"
  />
  <div class="container">
    <Header
      :clickBox="clickBox"
      @open-drawer="openDrawer"
      @on-change-search-input="onChangeSearchInput"
    />
    <ShopInfo />
    <div class="flex justify-between pt-5 mb-8">
      <ul class="flex justify-between">
        <li class="mr-10">All Plants</li>
        <li class="mr-10">New Arrivals</li>
        <li class="mr-10">Sale</li>
      </ul>
      <div class="flex pr-5 items-center">
        <p>Short by:</p>
        <select @change="onChangeSelect" class="py-2 px-3 outline-none">
          <option value="title">name</option>
          <option value="price">price (cheap)</option>
          <option value="-price">price (expensive)</option>
        </select>
      </div>
    </div>
    <CardList
      :meta="meta"
      :items="items"
      @on-click-page="onClickPage"
      @on-click-add="onClickAdd"
      @add-to-favorite="addToFavorite"
    />
  </div>
</template>

<style></style>

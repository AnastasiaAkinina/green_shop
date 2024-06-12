<script setup>
import { onMounted, provide, reactive, ref, watch, computed, inject } from "vue";
import axios from "axios";
import CardList from "../components/CardList.vue";
import ShopInfo from "../components/ShopInfo.vue";

const items = ref([]);
const meta = ref({});
const currentPage = ref(1);
const showInput = ref(false);

const { onClickAdd } = inject("cart");

const filters = reactive({
  sortBy: "title",
  searchQuert: "",
});

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value;
  console.log(filters.sortBy);
};

const onChangeSearchInput = (event) => {
  filters.searchQuert = event.target.value;
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
</script>

<template>
  <ShopInfo />
  <div class="flex justify-between pt-5 mb-8">
    <ul class="flex justify-between">
      <li class="mr-10">All Plants</li>
      <li class="mr-10">New Arrivals</li>
      <li class="mr-10">Sale</li>
    </ul>
    <div class="flex pr-5 items-center">
      <div class="ml-8 relative">
        <img @click="showInput = !showInput" src="/search-black.png" alt="/search" />
        <input
          v-show="showInput"
          @input="onChangeSearchInput"
          class="border absolute top-6 -left-8 shadow-lg"
          type="text"
        />
      </div>

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
</template>

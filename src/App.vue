<script setup>
import { provide, ref, watch, computed } from "vue";
import axios from "axios";
import Header from "./components/Header.vue";
import ShopInfo from "./components/ShopInfo.vue";

import Drawer from "./components/Drawer.vue";

const drawerOpen = ref(false);
const cart = ref([]);
const total = ref(0);
const tax = ref();
const isCreatinOrder = ref(false);
const clickBox = ref(0);

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
  cart,
  closeDrawer,
  addToCart,
  removeFromCart,
  onClickAdd,
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
    <Header :clickBox="clickBox" @open-drawer="openDrawer" />
    <router-view></router-view>
  </div>
</template>

<style></style>

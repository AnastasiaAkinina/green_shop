<script setup>
import { ref, inject } from "vue";

const { onChangeSearchInput } = inject("cart");

import CartItems from "./CartItems.vue";
const props = defineProps({
  id: Number,
  title: String,
  imageUrl: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickAdd: Function,
  onClickFavorite: Function,
  // search: Function,
});

const show = ref(false);
const inputShow = ref(false);
</script>

<template>
  <div>
    <div
      @mouseover="show = !show"
      @mouseout="show = !show"
      class="relative bg-[#FBFBFB] border border-slate-100 p-8 cursor-pointer transition hover:-translate-y-2 hover:shadow-xl hover:border-t-2 hover:border-t-green"
    >
      <img :src="imageUrl" alt="/" class="m-auto" />
      <div
        v-show="show"
        class="button__nav absolute bottom-7 left-32 flex justify-between w-32 m-auto z-30"
      >
        <img
          class="p-2 bg-white"
          @click="onClickAdd"
          :src="!isAdded ? '/box-black.png' : '/box-green.png'"
          alt="/"
        />
        <img
          class="p-2 bg-white"
          @click="onClickFavorite"
          :src="!isFavorite ? '/heart-black.png' : '/head=green.png'"
          alt="/"
        /><img
          class="p-2 bg-white relative"
          @click="inputShow = !inputShow"
          :src="!isFavorite ? '/search-black.png' : '/search-green.png'"
          alt="/"
        />
        <input
          v-show="inputShow"
          @input="(event) => onChangeSearchInput(event)"
          class="border absolute top-10 left-20 shadow-lg"
          type="text"
        />
      </div>
    </div>
    <div class="flex flex-col">
      <p class="mt-2">{{ title }}</p>
      <span class="text-slate-400 uppercase"
        ><b class="text-green">${{ price }}</b></span
      >
    </div>
  </div>
</template>

<style></style>

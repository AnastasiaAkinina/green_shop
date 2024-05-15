<script setup>
import { ref } from "vue";
const emit = defineEmits(["openDrawer", "onChangeSearchInput"]);
const showInput = ref(false);

defineProps({
  clickBox: Number,
});
</script>

<template>
  <div class="flex justify-between items-center mt-6 pb-6 text-base">
    <img src="/Logo.svg" alt="Logo/" />
    <ul class="flex justify-between">
      <li class="ml-12">Home</li>
      <li class="ml-12">Shop</li>
      <li class="ml-12">Plant Care</li>
      <li class="ml-12">Blogs</li>
    </ul>
    <ul class="flex justify-between items-center">
      <li class="ml-8"><img src="/heart-black.png" alt="/heart" /></li>
      <li class="ml-8 relative">
        <img @click="showInput = !showInput" src="/search-black.png" alt="/search" />
        <input
          v-show="showInput"
          @input="(event) => emit('onChangeSearchInput', event)"
          class="border absolute top-6 -left-8 shadow-lg"
          type="text"
        />
      </li>
      <li class="ml-8 relative">
        <img
          class="cursor-pointer"
          @click="() => emit('openDrawer')"
          src="/box-box.png"
          alt="/"
        />
        <button
          class="absolute -top-1 -right-3 bg-green text-white rounded-full border-4 border-white text-xs h-6 w-6"
        >
          {{ clickBox }}
        </button>
      </li>
      <li class="ml-8">
        <button class="bg-green flex text-gray py-2 px-5 items-center rounded-md">
          <img class="mr-1" src="/Logout.svg" alt="/" />Login
        </button>
      </li>
    </ul>
  </div>
  <div class="border-b-[0.3px] opacity-20 bg-green mb-3"></div>
</template>

<style scoped></style>

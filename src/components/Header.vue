<script setup>
import { ref, inject } from "vue";

const emit = defineEmits(["openDrawer"]);
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

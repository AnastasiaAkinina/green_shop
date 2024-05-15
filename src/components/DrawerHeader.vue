<script setup>
import { inject } from "vue";

const { closeDrawer } = inject("cart");
</script>

<template>
  <div class="flex items-center gap-5 mb-5">
    <img
      class="cursor-pointer"
      @click="() => closeDrawer()"
      src="/Arrow - Right.png"
      alt="/"
    />
    <h2 class="text-2xl font-bold">Cart</h2>
  </div>
</template>

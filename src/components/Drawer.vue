<script setup>
import DriwerHeader from "./DrawerHeader.vue";
import CartItems from "./CartItems.vue";

defineProps({
  total: Number,
  tax: Number,
  buttonDisabled: Boolean,
});

const emit = defineEmits(["createOrder"]);
</script>

<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-40 opacity-70"></div>
  <div
    class="bg-white w-96 h-full fixed right-0 top-0 z-50 p-8 flex flex-col justify-between"
  >
    <DriwerHeader />
    <CartItems />

    <div class="flex flex-col gap-4 mt-7">
      <div class="flex gap-2">
        <span>Total: </span>
        <div class="flex-1 border-b border-dashed"></div>
        <b>${{ total }}</b>
      </div>

      <div class="flex gap-2">
        <span class="uppercase">Tax 5%: </span>
        <div class="flex-1 border-b border-dashed"></div>
        <b>${{ tax }}</b>
      </div>
      <button
        :disabled="buttonDisabled"
        @click="() => emit('createOrder')"
        class="mt-4 cursor-pointer transition bg-lime-500 disabled:bg-slate-400 w-full rounded-xl py-3 text-white hover:bg-lime-600 active:bg-lime-700"
      >
        CHECKOUT
      </button>
    </div>
  </div>
</template>

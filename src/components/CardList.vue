<script setup>
import { ref } from "vue";
import Card from "./Card.vue";

const emit = defineEmits(["onClickAdd", "addToFavorite", "onClickPage"]);
// const { onClickHandler } = inject("cart");

defineProps({
  items: Array,
  meta: Object,
});
const currentPage = ref(1);
const show = ref(false);

const onClickHandler = (page) => {
  emit("onClickPage", page);
};
</script>

<template>
  <div v-auto-animate class="grid grid-cols-3 gap-5 mb-24">
    <Card
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :title="item.title"
      :imageUrl="item.imageUrl"
      :price="item.price"
      :onClickFavorite="() => emit('addToFavorite', item)"
      :onClickAdd="() => emit('onClickAdd', item)"
      :isFavorite="item.isFavorite"
      :isAdded="item.isAdded"
    />
  </div>
  <div class="flex justify-end">
    <vue-awesome-paginate
      :total-items="meta.total_items"
      :items-per-page="meta.per_page"
      :max-pages-shown="10"
      :hide-prev-next="true"
      v-model="currentPage"
      :on-click="onClickHandler"
    />
  </div>
</template>

<style>
.pagination-container {
  display: flex;
  column-gap: 10px;
}
.paginate-buttons {
  height: 35px;
  width: 35px;
  border-radius: 2px;
  cursor: pointer;
  background-color: white;
  border: 1px solid #e5e5e5;
  color: black;
}
.paginate-buttons:hover {
  background-color: #d8d8d8;
}
.active-page {
  background-color: #46a358;
  border: 1px solid #e5e5e5;
  color: white;
}
.active-page:hover {
  background-color: #46a358;
}
</style>

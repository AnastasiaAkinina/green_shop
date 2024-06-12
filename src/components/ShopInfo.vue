<script setup>
const arr = ["flowergroup.png", "flow-carusel1.png", "flow-carusel3.png"];
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
</script>

<template>
  <div class="flex justify-between px-10">
    <carousel :items-to-show="1.5">
      <slide class="" v-for="slide in arr" :key="slide">
        <div class="mt-16 text-left">
          <h3 class="uppercase tracking-[.14em] font-medium">Welcome to GreenShop</h3>
          <h1 class="uppercase my-2 text-6xl font-black">
            Let’s Make a Better <span class="text-green">Planet</span>
          </h1>
          <p class="mb-11 text-[#727272] leading-6 tracking-[.04em]">
            We are an online plant shop offering a wide range of cheap and trendy plants.
            Use our plants to create an unique Urban Jungle. Order your favorite plants!
          </p>
          <button class="bg-green text-gray px-7 py-2.5 items-center rounded-md">
            SHOP NOW
          </button>
        </div>
        <img :src="slide" alt="/" />
      </slide>
      <template #addons>
        <navigation />
        <pagination />
      </template>
    </carousel>
  </div>
</template>

<style setup>
.carousel__item {
  min-height: 200px;
  width: 100%;
  background-color: var(--vc-clr-primary);
  color: var(--vc-clr-white);
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__slide {
  width: 100% !important;
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}

.carousel__pagination {
  position: absolute;
  left: 50%;
  bottom: 2px;
}

.carousel__pagination-button::after {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #46a358;
  opacity: 0.3;
}

.carousel__pagination-button--active::after {
  opacity: 1;
}

.carousel__prev,
.carousel__next {
  display: none;
}
</style>
carousel__pagination-button carousel__pagination-button--active

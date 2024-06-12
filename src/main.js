import "./assets/main.css";

import {
    autoAnimatePlugin
} from "@formkit/auto-animate/vue";
import {
    createApp
} from "vue";
import {
    createRouter,
    createWebHistory
} from "vue-router";

import App from "./App.vue";
import Home from './pages/Home.vue';


import VueAwesomePaginate from "vue-awesome-paginate";

import "vue-awesome-paginate/dist/style.css";

const app = createApp(App);

const routes = [{
        path: "/",
        name: "Home",
        component: Home,
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
app.use(router);
// Vue.use(VueRouter)

app.use(autoAnimatePlugin);
// app.mount("#app");



// Register the package
app.use(VueAwesomePaginate).mount("#app");
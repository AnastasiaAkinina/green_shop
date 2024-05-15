import "./assets/main.css";

import {
    autoAnimatePlugin
} from "@formkit/auto-animate/vue";

// import {
//     createApp
// } from "vue";
// import App from "./App.vue";

const app = createApp(App);

app.use(autoAnimatePlugin);
// app.mount("#app");

import {
    createApp
} from "vue";
import App from "./App.vue";

// import the package
import VueAwesomePaginate from "vue-awesome-paginate";

// import the necessary css file
import "vue-awesome-paginate/dist/style.css";

// Register the package
app.use(VueAwesomePaginate).mount("#app");
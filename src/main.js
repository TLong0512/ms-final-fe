import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import "./assets/css/tailwind.css";
import "./assets/css/base.css";
import "./assets/css/icons.css";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";

loadFonts();

createApp(App).use(router).use(vuetify).use(Antd).mount("#app");

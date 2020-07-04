import Vue from "vue";
import VueCompositionApi from "@vue/composition-api";
import App from "./App.vue";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import "./registerServiceWorker";
import router from "./router";

Vue.config.productionTip = false;

Vue.use(VueCompositionApi, VueSweetalert2);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

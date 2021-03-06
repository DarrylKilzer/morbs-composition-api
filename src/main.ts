import Vue from "vue";
import App from "./App.vue";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import "./registerServiceWorker";
import router from "./router";
import { AppState } from "./AppState";

Vue.config.productionTip = false;

Vue.use(VueSweetalert2);

Vue.prototype.AppState = AppState;

new Vue({
  router,
  data() {
    return AppState;
  },
  render: h => h(App)
}).$mount("#app");

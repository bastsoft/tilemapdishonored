const GoogleMap = () => import("./google-map.vue.js");
const YandexMap = () => import("./yandex-map.vue.js");

const routes = [
  { path: "/", component: YandexMap },
  { path: "/googlemap", component: YandexMap },
  { path: "/googlemap/:type", component: YandexMap }
];

window.Vue.use(window.VueRouter);

const router = new window.VueRouter({
  mode: 'history', 
  routes
});

const app = new window.Vue({
  data() {
    return {
      drawer: false
    };
  },
  router,
  vuetify: new window.Vuetify()
}).$mount("#app");

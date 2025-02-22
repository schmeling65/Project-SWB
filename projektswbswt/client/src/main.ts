import VueRouter, { createRouter, createWebHashHistory } from "vue-router";
import { createApp } from "vue";
import App from "./App.vue";
import { routes, nonAuthRoutes } from "./routes";
import Keycloak from "keycloak-js";
import { authenticateAgainstKeycloak } from "./keyCloakRedirect";

export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

// Secure routes
router.beforeEach((to, from, next) => {
  if (localStorage.getItem("keycloakToken") == undefined) {
    next({ name: "Landingpage" });
  } else next();
});

// create the vue app
function instantiateVueApp() {
  createApp(App).use(router).mount("#app");
}

// Add keycloak authentication
if (!window.localStorage.getItem("keycloakToken")) {
  authenticateAgainstKeycloak().then(() => {
    instantiateVueApp();
  });
} else {
  instantiateVueApp();
}

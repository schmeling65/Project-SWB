import VueRouter, { createRouter, createWebHashHistory } from "vue-router";
import { createApp } from "vue";
import App from "./App.vue";
import { Vue } from "vue-class-component";
import { routes } from "./routes";
import Keycloak from "keycloak-js";
import { getUserByKeycloakString } from "./requests";
import{router} from "./main";

const routerKL = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

//connection to realm for login; url changeable depending on network
//and send these infos to keycloak and reload page
const initOptions = {
  url: "http://localhost:8080/auth",
  realm: "VueApp",
  clientId: "samam",
  onLoad: "login-required",
  redirect_uri: "http://localhost:3000/#/offerList",
  clientSecret: { secret: "ca5d1c35-304e-4256-a5ec-1cba1ac06aa4" },
};

const keycloak = Keycloak(initOptions);

/**
 * Create the Keycloak Authentication and save the Token to localStorage
 */
export async function authenticateAgainstKeycloak (): Promise<void> {
  const keycloak = Keycloak(initOptions)
  await keycloak.init({ onLoad: 'login-required' }).then((auth) => {
    if (!auth) {
      window.location.reload()
    } else {
      console.log('Authenticated')
    }
    
    if (keycloak.token) {
      window.localStorage.setItem('keycloakToken', keycloak.token)
    }
  })
  await router.push('/')
}

<template>
  <div>
    <div>
      <Header />
    </div>
    <!-- Router -->
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import Keycloak from "keycloak-js";
import { defineComponent, PropType } from "vue";
import CreateOffer from "./components/CreateOffer.vue";
import Header from "./components/Header.vue";
import OfferList from "./components/OfferList.vue";
require("./css/mystyles.css");

export default defineComponent({
  name: "app",
  components: {
    Header,
  },
  methods: {
    logout() {
      // Delete the keycloak token and return to login page
      window.localStorage.removeItem("keycloakToken");
      window.open("http://localhost:3000/", "_self");
    },
  },
});
</script>

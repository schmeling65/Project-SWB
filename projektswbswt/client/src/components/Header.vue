<template>
  <nav class="navbar is-dark">
    <div class="navbar-menu">
      <div class="navbar-start" style="margin-left: 5%">
        <a class="navbar-item">
          <img
            src="../assets/Logo-mit-Schirft.png"
            width="112"
            height="28"
            alt="SAMAM"
          />
        </a>
        <a
          class="navbar-item"
          v-if="this.$route.name != 'Landingpage'"
          v-on:click="onClick('chats')"
        >
          Chats
        </a>
        <a
          class="navbar-item"
          v-if="this.$route.name != 'Landingpage'"
          v-on:click="onClick('offerList')"
        >
          Kleinanzeigen
        </a>
        <a
          class="navbar-item"
          v-if="this.$route.name != 'Landingpage'"
          v-on:click="onClick('offerList')"
        >
          Wishlist
        </a>
        <a
          class="navbar-item"
          v-if="this.$route.name != 'Landingpage'"
          v-on:click="logout()"
        >
          Logout
        </a>
      </div>
      <div class="navbar-end"></div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from "vue";

export default defineComponent({
  /**
   * Setup all types and functions needed for this file.
   */
  methods: {
    onClick(endpoint: string) {
      window.open("http://localhost:3000/#/" + endpoint, "_self");
    },
    logout() {
      // call logout() from App.vue
      (this.$parent as any).logout();
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

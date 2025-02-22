<template>
  <section class="hero is-fullheight-with-navbar">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="columns is-align-self-baseline">
          <div class="column is-6">
            <h1 class="title is-3 has-text-white">
              Die
              <span id="oldFont"> Zeitungsanzeige </span>
              der digitalen Welt
            </h1>
            <h2 class="subtitle is-5 has-text-white">
              Das Online-Kleinanzeigen-Portal für deine Hochschule
            </h2>
            <br />
            <p class="has-text-centered">
              <a class="button is-medium is-primary" v-on:click="loginPress">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { defineComponent, PropType, reactive } from "vue";

export default defineComponent({
  /**
   * Setup all types and functions needed for this file.
   */
  setup() {
    /**
     * Redirect to home-page, if not logged in -> go for keycloak
     */
    const loginPress = () => {
      window.location.href = "http://localhost:3000/#/offerList";
    };
    return { loginPress };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hero-body {
  background: url("../assets/Landingpage.jpg") no-repeat center top;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
}
</style>

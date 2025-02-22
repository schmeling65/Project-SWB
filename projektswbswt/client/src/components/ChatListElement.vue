<template>
  <div class="box">
    <article class="media">
      <div class="media-left">
        <figure class="image is-64x64">
          <img
            src="https://bulma.io/images/placeholders/128x128.png"
            alt="Image"
          />
        </figure>
      </div>
      <div class="media-content">
        <div class="content">
          <p>
            <strong>Chat mit {{ this.user.name }}</strong>
          </p>
        </div>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from "vue";
import { Chat, UserChat, User } from "../types";
import {
  getUserByKeycloakString,
  getOtherUser,
  getUserByUserId,
} from "../requests";
import { keycloakString } from "../keyCloakRedirect";

export default defineComponent({
  props: {
    chat: {} as PropType<Chat>,
  },
  data() {
    return {
      user: {} as PropType<User>,
    };
  },
  async created() {
    getUserByKeycloakString(keycloakString).then((result) => {
      getOtherUser((this.chat as any).id, result.data[0].id).then((result) => {
        this.user = (result as any).data[0];
      });
    });
  },
});
</script>

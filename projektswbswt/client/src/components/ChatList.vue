<template>
  <div class="columns">
    <div class="column is-three-fifths is-offset-one-fifth">
      <div v-if="loading">Loading user...</div>
      <div v-else-if="error">
        {{ error.message }}
      </div>
      <div v-else>
        <!-- Create a ChatListElement for each chat-->
        <div
          v-for="outputChat in this.chats"
          :key="outputChat.id"
          :value="outputChat"
        >
          <ChatListElement
            :chat="outputChat"
            v-on:click="onClick(outputChat.id)"
          />
        </div>
        <div class="pageControll">
          <span
            class="material-icons"
            v-on:click="previousPage"
            v-if="page != 1"
          >
            arrow_back_ios
          </span>
          <span class="pageNumber">
            {{ page }}
          </span>
          <span class="material-icons" v-on:click="nextPage">
            arrow_forward_ios
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from "vue";
import chatStore from "../stores/chatStore";
import { Chat, UserChat, User } from "../types";
import ChatListElement from "./ChatListElement.vue";

export default defineComponent({
  /**
   * Setup all types and functions needed for this file.
   */
  created() {
    this.loading = true;
    this.page = 1;
    this.loadChats();
  },

  /**
   * Bind data to display the right names
   */
  data() {
    return {
      chats: null,
      users: null,
      page: 1,
      error: null,
      loading: false,
    };
  },
  components: {
    ChatListElement,
  },
  methods: {
    onClick(chatId: number) {
      window.open("http://localhost:3000/#/chat?id=" + chatId, "_self");
    },
    nextPage() {
      this.page += 1;
      this.loadChats();
    },
    previousPage() {
      this.page -= 1;
      this.loadChats();
    },
    async loadChats() {
      // Get all chats and show them when Promise is successful
      chatStore.actions
        .getAllChats(this.page)
        .then((result) => (this.chats = result as any))
        .catch((error) => (this.error = error))
        .finally(() => (this.loading = false));
    },
  },
});
</script>

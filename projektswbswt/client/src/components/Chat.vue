<template>
  <div id="chat">
    <div class="panel is-primary is-flex is-flex-direction-column">
      <p class="panel-heading top" style="margin-top: 2.5em">
        {{ title }}<br />mit {{ name }}
      </p>
      <div id="wrapper">
        <div v-for="message in messages" :key="message.id" :value="message">
          <Messagev
            :messageText="message.messageText"
            :authorUserId="message.authorUserId"
            :userId="form.authorUserId"
          />
        </div>
      </div>
      <form
        @submit.prevent="onSubmit"
        class="field is-grouped is-grouped-centered bottom"
      >
        <input
          class="input"
          type="text"
          placeholder="Tippen um zu chatten"
          v-model="form.messageText"
        />
        <div class="field is-grouped is-grouped-centered">
          <p class="control">
            <button type="submit" class="button is-primary">Submit</button>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from "vue";
import createMessageStore from "../stores/createMessageStore";
import retrieveMessagesStore from "../stores/retrieveMessagesStore";
import { Message } from "../types";
import Messagev from "./Message.vue";
import { getOtherUser, getUserByKeycloakString } from "../requests";
import { keycloakString } from "../keyCloakRedirect";

/**
 * Get the list of url query parameters.
 */
function getUrlArgs() {
  const args = {};
  const parts = window.location.href.replace(
    /[?&]+([^=&]+)=([^&]*)/gi,
    function (m, key, value) {
      (args as any)[key] = value;
      return (args as any)["id"];
    }
  );
  return args;
}

export default defineComponent({
  components: { Messagev },

  /**
   * Setup all types and functions needed for this file.
   */
  setup() {
    const { state, getters, actions } = createMessageStore;
    const form = reactive({
      id: 5,
      messageText: "",
      chatId: (getUrlArgs() as any)["id"],
      // TODO: set authorUserId globally
      authorUserId: -1,
    });

    getUserByKeycloakString(keycloakString).then((result) => {
      form.authorUserId = (result as any).data[0].id;
    });

    /**
     * Create a message when the form is submitted and reload the page to purge old message from input.
     */
    const onSubmit = () => {
      createMessageStore.actions.createMessage(form);
      setTimeout("location.reload(true);", 30);
    };

    return { form, onSubmit, createMessageStore };
  },

  /**
   * Bind data to display the right names
   */
  data() {
    return {
      title: "Chat",
      name: "defaultuser",
      messages: null,
    };
  },

  async created() {
    this.messages = (await retrieveMessagesStore.actions.retrieveMessages(
      this.form.chatId
    )) as any;
    this.$el.scrollTo(0, this.$el.scrollHeight);

    getOtherUser(this.form.chatId, this.form.authorUserId).then((result) => {
      this.name = (result as any).data[0].name as any;
    });
  },
});
</script>

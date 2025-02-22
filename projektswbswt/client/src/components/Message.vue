<template>
  <div class="chat-log">
    <div v-if="authorUserId != userId">
      <div class="panel-block left is-pulled-left">
        <article class="message is-primary">
          <div class="message-body">{{ messageText }}</div>
        </article>
      </div>
    </div>
    <div v-else>
      <div class="panel-block right is-pulled-right">
        <article class="message">
          <div class="message-body">{{ messageText }}</div>
        </article>
      </div>
    </div>
    <div class="panel-block divider" style="width: 100%;"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from "vue";
import { Vue } from "vue-class-component";
import { Message } from "../types";

export default defineComponent({
  props: {
    messageText: {} as PropType<string>,
    authorUserId: {} as PropType<number>,
    userId: {} as PropType<number>,
  },
});
</script>

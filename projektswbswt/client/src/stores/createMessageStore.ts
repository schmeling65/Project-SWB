import { reactive } from "vue";
import { Message } from "@/types";
import { createMessage } from "@/requests";

/**
 * The client state of a message
 */

const state = reactive({
  messageText: "",
  chatId: 0,
  authorUserId: 0,

  error: "",
});

const getters = reactive({});

const actions = {
  /**
   * Create a message.
   * @param message The Json with the information needed to create a message.
   */
  async createMessage(message: Message) {
    const messageCreated = await createMessage(message);
    if (!messageCreated) {
      state.error =
        "An error occured while creating this message. Please check your data.";
    }
    console.log(message);
  },
};

export default { state, getters, actions };

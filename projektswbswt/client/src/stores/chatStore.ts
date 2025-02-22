import { reactive } from "vue";
import { Chat, UserChat } from "@/types";
import { createChat, createUserChat, getChats, getUserByKeycloakString } from "@/requests";
import { keycloakString } from "../keyCloakRedirect";

/**
 * The client state of a chat
 */

const state = reactive({
  error: "",
});

const getters = reactive({});

const actions = {
  /**
   * Createe a UserChat.
   * @param userId the id of the user.
   * @param chatId the id of the chat.
   */ 
   async createUserChat(userId: number, chatId: number) {
    console.log(userId, chatId);
    const form = reactive({
      id: 5,
      userId: userId,
      chatId: chatId,
    });

    createUserChat(form);
  },

  /**
   * Create a chat.
   * @returns the id of the chat.
   */
  async createChat(userId : number) {
    let thisUserId = -1;
    const chatCreated = await createChat();
    if (!chatCreated[0]) {
      state.error =
        "An error occured while creating this chat. Please check your data.";
    }
    await getUserByKeycloakString(keycloakString).then((result) => {
      thisUserId = (result as any).data[0].id;
    });

    this.createUserChat(userId, chatCreated[1]);
    this.createUserChat(thisUserId, chatCreated[1]);
    return chatCreated[1];
  },

  /**
   * Get all chats of the page.
   * @param page Number of the page that should be displayed.
   * @returns A Promise containing all chats for this page
   */
   async getAllChats(page: number) {
    const chats = getChats(page);
    return chats;
  },
};

export default { state, getters, actions };

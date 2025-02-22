import { computed, reactive } from "vue";
import { Message } from "@/types";
import { retrieveMessages } from "@/requests";


const getters = reactive({});

const actions = {
  /**
   * Retrieve messages.
   * @param chatId the Id of the chat to retrieve messages for.
   * @returns The Json with the informations needed to create an offer.
   */
  async retrieveMessages(chatId : number) : Promise<Message[]> {
      const data = retrieveMessages();
      const jsonRes : Message[] = [];
      (await data).forEach(element => {
        if(element.chatId == chatId)
        {
          const message : Message = element;
          jsonRes.push(message);
        }
      });

      return jsonRes;
  }
};

export default { getters, actions };

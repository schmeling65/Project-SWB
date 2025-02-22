import { Message, Offer, User, Chat, UserChat } from "@/types";
import axios from "axios";

//#region Offer Requests
/**
 * Send a POST Request to create an offer.
 * @param offer The offer.
 * @returns whether the offer was created.
 */
export async function requestCreateOffer(offer: Offer): Promise<any> {
  return axios
    .post("http://localhost:9000/offer", offer, {
      headers: {},
    });
}

/**
 * Send a request to update an offer.
 * @param offer The updated Offer Data
 * @returns whether the update was successful or not.
 */
export async function requestUpdateOffer(offer: Offer): Promise<boolean> {
  axios
    .put("http://localhost:9000/offer/" + offer.id, offer)
    .then((response) => console.log(response.data))
    .catch((error) => {
      console.error("There was an error updating this offer.", error);
      return false;
    });
  return true;
}

/**
 * Delete an offer.
 * @param offerId The id of the Offer that sould be deleted.
 * @returns whether the offer is deleted or not.
 */
export async function requestDeleteOffer(offerId: number): Promise<boolean> {
  axios
    .delete("http://localhost:9000/offer/" + offerId)
    .then((response) => console.log(response.data))
    .catch((error) => {
      console.error("There was an error updating this offer.", error);
      return false;
    });
  return true;
}

/**
 * Sent a GET Request to get all offers.
 * @param page Number of the Page that should be displayed
 * @returns Promise with all offers of that page.
 */
export async function getOffers(page: number) {
  const offers = axios.get("http://localhost:9000/offer", {
    params: { pageNr: page },
  });
  return offers;
}
//#endregion

//#region Chat Requests
/**
 * Createe a UserChat.
 * @param userChat the userChat.
 */
export function createUserChat (userChat: UserChat) {
  axios.post("http://localhost:9000/userchat", userChat, {
    headers: {},
  })
  .then((response) => console.log(response.data))
  .catch((error) => {
    console.error("There was an error creating this userChat.", error);
    return false;
  });
  return true;
}

/**
 * Send a POST Request to create a message.
 * @param message The message.
 * @returns whether the message was created.
 */
export async function createMessage(message: Message): Promise<boolean> {
  axios
    .post("http://localhost:9000/messages", message, {
      headers: {},
    })
    .then((response) => console.log(response.data))
    .catch((error) => {
      console.error("There was an error creating this message.", error);
      return false;
    });
  return true;
}

/**
 * Fetch messages from server.
 * @param path The path to fetch from.
 * @returns the fetched data.
 */
export async function retrieveMessages(): Promise<Message[]> {
  const { data } = await axios.get("http://localhost:9000/messages");
  return data;
}

let respons: string;

/**
 * Send a POST Request to create a chat.
 * @returns whether the chat was created and the chatId.
 */
export async function createChat(): Promise<[boolean, number]> {
  await axios
    .post("http://localhost:9000/chat", {} as Chat, {
      headers: {},
    })
    .then((response) => {
      console.log(response.data);
      respons = response.data.id;
      return [true, +respons];
    })
    .catch((error) => {
      console.error("There was an error creating this chat.", error);
      return [false, -1];
    });
  return [true, +respons];
}

/**
 * Sent a GET Request to get all chats.
 * @param page Number of the Page that should be displayed
 * @returns Promise with all chats of that page.
 */
export async function getChats(page: number) {
  const { data } = await axios.get("http://localhost:9000/chat", {
    params: { pageNr: page },
  });
  return data;
}

/**
 * Fetch chats from server.
 * @returns the fetched data.
 */
export async function retrieveAllUserChats(): Promise<UserChat[]> {
  const { data } = await axios.get("http://localhost:9000/userChat");
  return data;
}

/**
 * Sent a GET Request to get the userId of the user chatted with.
 * @param chatId the id of the chat in question
 * @param userId the id of the current user
 * @returns Promise containing the other user.
 */
export async function getOtherUser(
  chatId: number,
  userId: number
): Promise<User> {
  let res = getUserByUserId(-1);
  await retrieveAllUserChats().then(result => {result.forEach(element => {
    if (element.chatId == chatId && element.userId != userId) {
      res = getUserByUserId(element.userId);
    }
  })});
  return res as any;
}

/**
 * Sent a GET Request to get all offers.
 * @param page Number of the Page that should be displayed
 * @param sortByPrice 1 = asc, -1 = desc; other values => sort by createdAt desc
 * @param form Data to search files
 * @returns Promise with all offers of that page.
 */
export async function requestGetOffers(page: number, sortByPrice: number, form: any) {
  const offers = axios.get("http://localhost:9000/offer", {
    params: { pageNr: page, sortByPrice: sortByPrice, name:form.name, offertype: form.offertype },
  });
  return offers;
}
//#endregion

//#region User Requests
/**
 * Send a GET Request to get the User
 * @param userstring The users ID (string) provided by Keycloak
 * @returns Promise with the user
 */
export async function getUserByKeycloakString(userstring: string) {
  const user = axios.get("http://localhost:9000/user", {
    params: { keycloakStringID: userstring },
  });
  return user;
}

/**
 * Send a GET Request to get the User
 * @param UserIdNumber The userID provided by the database
 * @returns Promise with the user
 */

export async function getUserByUserId(UserIdNumber: number) {
  const user = axios.get("http://localhost:9000/user", {
    params: { id: UserIdNumber },
  });
  return user;
}

/**
 * Send a POST Request to create a User
 * @param userstring The user ID (string) provided by Keycloak
 */

export async function createUser(userstring: string) {
  axios.post("http://localhost:9000/user", {
    params: { keycloakStringID: userstring },
  });
}
//#endregion

//#region image requests

/**
 * Upload the image so it can be displayed
 * @param images The images as FromData object
 * @returns A Promise with the response
 */
export async function requestUploadImages(images: FormData): Promise<any> {
  return axios
    .post("http://localhost:9000/image", images, {
      headers: { "Content-Type": "multipart/form-data" },
    })
}
//#endregion

/**
 * Search for specific offers
 * @param searchString The string that should be searched
 * @returns The offers containing the searched string
 */
export async function requestSearchOffers(searchString:string){
  return axios.get("http://localhost:9000/offer", {params:{ name: String(searchString)}});
}
//#endregion

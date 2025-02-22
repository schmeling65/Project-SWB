/**
 * File to define types
 */

/**
 * Define offers
 */
export type Offer = {
  id: number;
  name: string;
  text: string;
  offertype: boolean;
  filename: string;
  price: number;
  location: string;
};

/**
 * Define chats
 */
export type Chat = {
  id: number;
};

/**
 * Define userChats
 */
export type UserChat = {
  id: number;
  chatId: number;
  userId: number;
};

/**
 * Define users
 */
export type User = {
  id: number;
  keycloakStringID: String;
  name: String;
  profilepicture: number;
  age: number;
};

/**
 * Define messages
 */
export type Message = {
  id: number;
  messageText: string;
  chatId: number;
  authorUserId: number;
};

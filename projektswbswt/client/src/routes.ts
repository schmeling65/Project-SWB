import Landingpage from "./components/Landingpage.vue";
import Admin from "./components/admin.vue";
import Denied from "./components/denied.vue";
import CreateOffer from "./components/CreateOffer.vue";
import OfferList from "./components/OfferList.vue";
import Chat from "./components/Chat.vue";
import ChatList from "./components/ChatList.vue";
import Home from "./components/home.vue";
import App from "./App.vue";
import { RouteComponent } from "vue-router";

export const routes = [
  { path: "/", name: "Landingpage", component: Landingpage },
  { path: "/denied", name: "Denied", component: Denied },
  { path: "/admin", name: "Admin",component: Admin}, 
  { path: "/createOffer", name: "createOffer",component: CreateOffer},
  { path: "/offerList", name: "offerList",component: OfferList},  
  { path: "/chat", name: "chat",component: Chat},
  { path: "/chats", name: "chatList",component: ChatList},
]

export const nonAuthRoutes = [
  { path: "/", name: "Landingpage", component: Landingpage },
];

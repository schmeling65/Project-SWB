<template>
  <div>
    <div id="Icons">
      <span class="material-icons icon left" v-on:click="goback">
        arrow_back
      </span>
      <span>
        <span class="material-icons icon right" v-on:click="deleteOffer">
          delete
        </span>
        <span class="material-icons icon right" v-on:click="editOffer">
          edit
        </span>
      </span>
      <span class="material-icons" v-on:click="chatWith"> chat </span>
    </div>
    <div class="content" v-if="!this.isEditView">
      <h1>{{ offer.name }}</h1>
      <img
        :src="this.imgSrc"
        alt="Image"
        v-if="this.imgSrc != ''"
        class="imgDetail"
      />
      <h3>Beschreibung</h3>
      <p>{{ offer.text }}</p>
      <br />
      <div class="columns">
        <div class="column is-half">
          <span class="material-icons"> location_on </span>
          <span class="icon-text"> {{ offer.location }} </span>
        </div>
        <div class="column">
          <span class="material-icons"> euro </span>
          <strong class="icon-text"> {{ offer.price }} </strong>
        </div>
      </div>
    </div>
    <div class="content" v-else-if="this.isEditView">
      <CreateOffer :offer="this.offer" />
    </div>
    <div>
      <button class="button is-primary" v-on:click="chatWith()">
        Neuer Chat mit dem Ersteller dieses Angebots
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Offer } from "../types";
import offerStore from "../stores/offerStore";
import CreateOffer from "./CreateOffer.vue";
import chatStore from "../stores/chatStore";

export default defineComponent({
  name: "OfferDetails",
  data() {
    return {
      isEditView: false,
      imgSrc: "",
      chatId: -1,
    };
  },
  components: {
    CreateOffer,
  },
  props: {
    offer: {} as PropType<Offer>,
  },
  created() {
    this.isEditView = false;
    if ((this.offer as any)?.filename != undefined) {
      this.imgSrc = "http://localhost:3000/" + (this.offer as any)?.filename;
    }
  },
  methods: {
    /**
     * Return from EditView to DetailView or from DetailView to the OfferList
     */
    goback() {
      if (this.isEditView) {
        this.isEditView = false;
      } else {
        let parent = this.$parent;
        (parent as any).showListView();
      }
    },
    /**
     * Edit this offer
     */
    editOffer() {
      this.isEditView = true;
    },
    /**
     * Delete this offer
     */
    deleteOffer() {
      if (this.offer != undefined) {
        offerStore.actions.deleteOffer(this.offer);
        alert("Offer deleted:" + this.offer.name);
        this.goback();
      }
    },
    chatWith() {
      // TODO : replace with actual userId
      chatStore.actions.createChat(1200).then((response) => {
        this.chatId = response;
        window.open("http://localhost:3000/#/chat?id=" + this.chatId, "_self");
      });
    },
  },
});
</script>

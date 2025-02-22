<template>
  <div class="box">
    <article class="media">
      <div class="media-left">
        <figure class="image is-64x64">
          <img :src="this.imgSrc" alt="Image" class="listElementImage"/>
        </figure>
      </div>
      <div class="media-content">
        <div class="content">
          <strong>{{ this.offer.name }}</strong>
          <br />
          {{ this.offer.text }}
          <br />
          <br />
          <div v-if="this.offer.price != 0 && this.offer.price">
            <strong> {{ this.offer.price }} € </strong>
          </div>
          <div v-else>Kein Preis angegeben</div>
        </div>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from "vue";
import { Offer } from "../types";

export default defineComponent({
  name: "offerListElement",
  props: {
    offer: {} as PropType<Offer>,
  },
  data() {
    return {
      imgSrc: "",
    };
  },
  created() {
    if ((this.offer as any)?.filename != undefined) {
      this.imgSrc = "http://localhost:3000/" + (this.offer as any)?.filename;
    }
    else{
      this.imgSrc = "https://bulma.io/images/placeholders/128x128.png"
    }
  },
});
</script>

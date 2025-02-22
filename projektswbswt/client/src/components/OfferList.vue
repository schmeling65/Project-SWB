<template>
  <div class="columns">
    <div class="column is-three-fifths is-offset-one-fifth">
      <div v-if="showList">
        <div v-if="loading">Loading user...</div>
        <div v-else-if="error">
          {{ error.message }}
        </div>
        <div v-else class="column">
          <div class="columns">
            <div class="select is-primary control">
              <select v-model="sortByPrice" v-on:change="loadOffers">
                <option value="0">Sortieren nach...</option>
                <option value="1">Preis austeigend</option>
                <option value="-1">Preis absteigend</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="Suche.."
              class="input is-primary column control"
              v-model="form.name"
              v-on:change="loadOffers"
            />
            <div class="field-body column">
              <div class="field control">
                <label class="radio">
                  <input
                    type="radio"
                    name="OfferSearch"
                    value="-1"
                    @change="onChange($event)"
                    checked
                  />
                  Alle Anzeigen
                </label>
                <label class="radio">
                  <input
                    type="radio"
                    name="OfferSearch"
                    value="0"
                    @change="onChange($event)"
                  />
                  Biete
                </label>
                <label class="radio">
                  <input
                    type="radio"
                    name="OfferSearch"
                    value="1"
                    @change="onChange($event)"
                  />
                  Suche
                </label>
              </div>
            </div>
          </div>
          <!-- Ceate an OfferListElement for each offer-->
          <div
            v-for="outputOffer in this.offers.data"
            :key="outputOffer.id"
            :value="outputOffer"
          >
            <OfferListElement
              :offer="outputOffer"
              v-on:click="showDetailView(outputOffer)"
            />
          </div>
        </div>
        <div class="buttonContainer">
          <button
            class="button is-primary floatingButton"
            v-on:click="onClick()"
          >
            Kleinanzeige erstellen
          </button>
        </div>
        <div class="pageControll">
          <span
            class="material-icons"
            v-on:click="previousPage"
            v-if="page != 1"
          >
            arrow_back_ios
          </span>
          <span class="pageNumber">
            {{ page }}
          </span>
          <span class="material-icons" v-on:click="nextPage" v-if="showNextPageArrow">
            arrow_forward_ios
          </span>
        </div>
      </div>
      <div v-else>
        <OfferDetail :offer="this.detailOffer" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import offerStore from "../stores/offerStore";
import OfferListElement from "./OfferListElement.vue";
import OfferDetail from "./OfferDetail.vue";
import { Offer } from "../types";

export default defineComponent({
  data() {
    return {
      loading: false,
      error: null,
      showList: true,
      offers: null,
      detailOffer: {} as Offer,
      page: 1,
      sortByPrice: 0,
      showNextPageArrow: true
    };
  },
  setup() {
    const form = reactive({
      name: "",
      offertype: -1,
    });
    return { form };
  },
  components: {
    OfferListElement,
    OfferDetail,
  },
  created() {
    const { state, getters, actions } = offerStore;
    this.loading = true;
    this.showList = true;
    this.page = 1;
    this.showNextPageArrow = true;
    this.loadOffers();
  },

  methods: {
    /**
     * Opens createOffer window when the Button is clicked
     */
    onClick() {
      window.open("http://localhost:3000/#/createOffer", "_self");
    },
    showDetailView(offer: Offer) {
      this.detailOffer = offer;
      this.showList = false;
    },
    showListView() {
      this.detailOffer = {
        id: -1,
        name: "",
        text: "",
        offertype: true,
        location: "",
        price: 0,
        filename: ""
      };
      this.showList = true;
    },
    nextPage() {
      this.page += 1;
      this.loadOffers();
    },
    previousPage() {
      this.page -= 1;
      this.loadOffers();
    },
    loadOffers() {
      // Get all offers and show them when Promise is successful
      offerStore.actions
        .getOffers(this.page, this.sortByPrice, this.form)
        .then((result) => {
          this.offers = result as any;
          this.showNextPageArrow = (this.offers as any).data.length >= 20 ? true : false;
          })
        .catch((error) => (this.error = error))
        .finally(() => (this.loading = false));
    },
    onChange(event: any) {
      /**
       * Update the offertype when the radiobuttons have been clicked
       * The reload the offers
       */
      this.form.offertype = event.target.value;
      this.loadOffers();
    },
  },
});
</script>

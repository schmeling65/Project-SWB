import { computed, reactive } from "vue";
import { Offer } from "@/types";
import {
  requestCreateOffer,
  requestGetOffers,
  requestUpdateOffer,
  requestDeleteOffer,
  requestSearchOffers
} from "@/requests";

/**
 * The client state of an offer
 */

const state = reactive({
  title: "",
  description: "",
  offerType: true,

  error: "",
});

const getters = reactive({});

const actions = {
  /**
   * Create an offer.
   * @param offer The Json with the informations needed to create an offer.
   */
  async createOffer(offer: Offer) {
    return requestCreateOffer(offer);
  },

  /**
   * Get all of the page offers.
   * @param page Number of the page that should be displayed.
   * @param sortByPrice 1 = asc, -1 = desc; other values => sort by createdAt desc
   * @param form Form data to search offers
   * @returns A Promise with all offers for this page in it
   */
  async getOffers(page: number, sortByPrice: number, form: any) {
    const offers = requestGetOffers(page, sortByPrice, form);
    return offers;
  },

  /**
   * Update offer
   * @param offer The Json with the informations of the offer.
   */
  async updateOffer(offer: Offer) {
    state.error = "";
    const updated = await requestUpdateOffer(offer);
    if (!updated) {
      state.error =
        "An error occured while updating this offer. Check your Data please.";
    }
    console.log(offer);
  },

  /**
   * Delete an offer.
   * @param offer Offer that should be deleted
   */
  async deleteOffer(offer: Offer) {
    state.error = "";
    const deleted = await requestDeleteOffer(offer.id);
    if (!deleted) {
      state.error = "The offer couldn't be deleted";
    }
  },

  async searchOffer(searchString:string){
    const search = requestSearchOffers(searchString);
    return search;
  },
};

export default { state, getters, actions };

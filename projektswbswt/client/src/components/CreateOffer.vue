<template>
  <div id="offerForm" class="container">
    <h1 class="title is-2">Kleinanzeige erstellen</h1>
    <form>
      <div class="field is-horizontal">
        <div class="field-label">
          <label class="label">Titel</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input
                class="input is-primary"
                type="text"
                placeholder="Titel der Kleinanzeige"
                v-model="form.name"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label">
          <label class="label">Anzeigenart</label>
        </div>
        <div class="field-body">
          <div class="field control">
            <label class="radio">
              <input
                type="radio"
                name="OfferSearch"
                value=0
                @change="onChange($event)"
                checked
              />
              Biete
            </label>
            <label class="radio">
              <input
                type="radio"
                name="OfferSearch"
                value=1
                @change="onChange($event)"
              />
              Suche
            </label>
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label">
          <label class="label">Beschreibung</label>
        </div>
        <div class="field-body">
          <div class="control field">
            <textarea
              class="textarea is-primary"
              placeholder="Beschreibe, um was es genau geht"
              v-model="form.text"
            ></textarea>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="field is-horizontal column is-half is-offset-1">
          <div class="field-label">
            <label class="label">Ort</label>
          </div>
          <div class="field-body">
            <div class="control field">
              <input
                class="input is-primary"
                type="text"
                placeholder="Treffpunkt / Übergabeort"
                v-model="form.location"
              />
            </div>
          </div>
        </div>

        <div class="field is-horizontal column">
          <div class="field-label">
            <label class="label">Preis (in €)</label>
          </div>
          <div class="field-body">
            <div class="control field">
              <input
                class="input is-primary"
                type="text"
                placeholder="50"
                v-model="form.price"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        id="file-js-example"
        class="file has-name field is-primary is-centered"
        v-if="!this.isEdit"
      >
        <label class="file-label">
          <input
            class="file-input"
            id="fileupload"
            type="file"
            name="file"
            multiple
            v-on:change="onChangeFiles"
          />
          <span class="file-cta">
            <span class="file-icon">
              <i class="fas fa-upload"></i>
            </span>
            <span class="file-label"> Anzeigebild hochladen </span>
          </span>
          <span class="file-name" v-if="this.filenames == ''">
            No file uploaded
          </span>
          <span class="file-name" v-else> {{ this.filenames }} </span>
        </label>
      </div>

      <div class="field is-grouped is-grouped-centered">
        <p class="control">
          <button
            class="button is-primary"
            v-on:click="onSubmit()"
            v-if="!this.isEdit"
          >
            Anzeige erstellen
          </button>
          <button class="button is-primary" v-on:click="onSubmit()" v-else>
            Anzeige bearbeiten
          </button>
        </p>
        <p class="control">
          <button class="button is-light" v-on:click="cancel()">
            Abbrechen
          </button>
        </p>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from "vue";
import offerStore from "../stores/offerStore";
import { Offer } from "../types";
import { requestUploadImages } from "../requests";

export default defineComponent({
  data() {
    return {
      isEdit: false,
      filenames: "",
    };
  },
  props: {
    offer: {} as PropType<Offer>,
  },
  /**
   * Setup all types and functions needed for this file.
   */
  setup() {
    const { state, getters, actions } = offerStore;
    const form = reactive({
      id: 0, // id will be set by the server
      name: "",
      text: "",
      offertype: false,
      price: 0,
      location: "",
      filename: "",
    });

    /**
     * Create an offer when the form is submitted.
     */
    return { form, offerStore };
  },
  created() {
    if (this.offer != undefined) {
      if (this.offer.id != undefined) {
        this.form.id = this.offer.id;
        this.form.name = this.offer.name ?? "";
        this.form.text = this.offer.text ?? "";
        this.form.location = this.offer.location ?? "";
        this.form.price = this.offer.price ?? 0;
        this.form.offertype = this.offer.offertype ?? true;

        this.isEdit = true;
      }
    } else {
      this.isEdit = false;
    }
  },
  methods: {
    /**
     * Send User back to OfferList when he cancels creation
     */
    cancel() {
      window.open("http://localhost:3000/#/offerList", "_self");
    },
    /**
     * Create the offer and send the user back to the OfferList
     */
    onSubmit() {
      /**
       * Edit Offer
       */
      if (this.isEdit) {
        offerStore.actions.updateOffer(this.form);
      } else {
        /**
         * create new Offer
         */
        var bodyFromData = new FormData();
        var file = (document.getElementById("fileupload") as any)?.files[0];
        var filename = null;
        if (file != null) {
          filename = `${Date.now()}-${file.name}`;
          this.form.filename = filename;
          var uploadfile = new File([file], filename, {
            type: file.type,
          })
          bodyFromData.append("file", uploadfile);
        }

        /**
         * Upload Image first
         */
        offerStore.actions
          .createOffer(this.form)
          .then(() => {
            requestUploadImages(bodyFromData);
          })
          .catch((error) => console.log(error))
          .finally(() =>
            window.open("http://localhost:3000/#/offerList", "_self")
          );
      }
    },
    onChangeFiles() {
      this.filenames = "";
      var files = (document.querySelector(
        "input[type=file]"
      ) as HTMLInputElement).files;
      if (files != null) {
        for (var i = 0; i < files.length; i++) {
          this.filenames += " " + files[i].name;
        }
      }
    },
    onChange(event: any){
      /**
       * Update offertype when radio button value is changed
       */
      this.form.offertype = event.target.value;
    }
  },
});
</script>

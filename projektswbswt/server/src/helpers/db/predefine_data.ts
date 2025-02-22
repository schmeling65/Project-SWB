'use strict';

const mongoose = require('mongoose');
/**
 * Hier werden Testdaten in die Datenbank intialisiert bei Server-start.
 */
const usersDocs = [
    {id:1000, keycloakStringID:"b06add28-22c1-43e1-95c8-066e69e4e82b", name:"Hans Wurst", profilepicture:100, age: 42},
    {id:1100, keycloakStringID:"b99adc37-3c12-4ce4-97ea-32f80ea3e711", name:"Peter Maier", profilepicture:101, age: 22},
    {id:1200, keycloakStringID:"4e1d3d5b-b208-4098-a965-c96af13fcf88", name:"Leah Neuer", profilepicture:50, age: 24}
    ]

const offersDocs = [
    {id:2000, name:"Biete Wohnung", text:"Biete vier Zimmer Wohnung; Bad,Küche,Schlafzimmer,Wohnzimmer", userid: 10, offertype: 1}, //offer zu Hans Wurst
    {id:2001, name:"Suche Hausaufgaben", text:"Ich suche nach Hausaufgaben, die ich für euch erledigen kann", userid: 11, offertype: 0}, //offer zu Peter Maier
    {id:2200, name:"Suche gemeinsame Aktivitäten", text:"Suche nach Aktivitäten, die man gemeinsam macht", userid: 12, offertype: 0} //offer zu Leah Neuer
]
const imagesDocs = [
    {id:500, offerId:2000, width:500, height:500, image:"Bad"}, //bild zu offer "Biete Wohnung"
    {id:300, offerId:2000, width:1920, height:1080, image:"Kueche"}, //bild zu offer "Biete Wohnung"
    {id:100, offerId:2200, width:750, height:750, image:"testimage"} //bild zu offer "Suche gemeinsame Aktivitäten"
]
const userchatsDocs = [
    {id:5000, chatId:2000, userId:1000}, //Userchat mit Hans Wurst
    {id:4900, chatId:2000, userId:1200} //Userchat mit Leah Neuer; beide im selben Raum
]
const userwatchlistsDocs= [
    {id:900, userId: 1100, offerId: 2200}, //Peter Maier hat sich "Suche gemeinsame Aktivitäten" angeschaut
    {id:1300, userId: 1200, offerId: 2200} //Leah Neuer hat sich "Suche gemeinsame Aktivitäten" angeschaut
]
const chatsDocs = [
    {id:2000} //der einzige chat den es gibt; mit Hans Wurst und Leah Neuer
]
const messagesDocs = [
    {id: 6000, messageText: "Suche eine Wohnung, kann ich deine besichtigen?", chatId:2000, authorUserId:1200} // Nachricht von Leah Neuer im chat mit Hans Wurst
]

/**
 * Counters needed to create ids!
 * @
 */
const counters = [
    {id: "chatId", sequence_value: 0},
    {id: "imageId", sequence_value: 0},
    {id: "messageId", sequence_value: 0},
    {id: "offerId", sequence_value: 0},
    {id: "userId", sequence_value: 0},
    {id: "userChatId", sequence_value: 0},
    {id: "userWishlistId", sequence_value: 0},
]

/**
 * Init function beim Laden. 
 * Initialisiert die Dokumente in die jeweiligen Kollektionen
 */
const init = () => {
    initializeData("users",usersDocs)
    initializeData("offers",offersDocs)
    initializeData("images",imagesDocs)
    initializeData("userchats",userchatsDocs)
    initializeData("userwatchlists",userwatchlistsDocs)
    initializeData("chats",chatsDocs)
    initializeData("messages",messagesDocs)
    initializeData("counters",counters)
};

/**
 * Checkt auf Vorhanden sein der Kollektion und fügt die Dokumente dann ein.
 * Falls fehlschlägt, gibt Fehler zurück.
 * @collectionName Kollektionsname
 * @ArrayDocument ein Array über Dokumente {},{},...  welche in die Datenbank eingefügt werden
 */

const initializeData = (collectionName, ArrayDocument) => {
  try {
    mongoose.connection.db
      .collection(collectionName, null, function () {})
      .insertMany(ArrayDocument, null, function (err, res) {
        if (err) {
          console.log(
            "Error occured while testdata was added to the DB. " + err
          );
        }
      });
  } catch {
    console.log("collection '" + collectionName + "' not up!");
  }
};

module.exports = init;
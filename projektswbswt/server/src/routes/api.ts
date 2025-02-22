import * as express from 'express';
import { ChatController } from '../controllers/chat_controller';
import { ImageController } from '../controllers/image_controller';
import { MessageController } from '../controllers/message_controller';
import { OfferController } from '../controllers/offer_controller';
import { UserChatController } from '../controllers/userchat_controller';
import { UserWatchlistController } from '../controllers/userwatchlist_controller';
import { UserController } from '../controllers/user_Controller';
import { CounterController } from '../controllers/counter_Controller';

import {upload} from '../helpers/uploads/files';

const authstring = "http://127.0.0.1:8080/auth/realms/VueApp/protocol/openid-connect/auth?client_id=samam&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F%23%2Fofferlist&state=61cf21cc-eb1a-470a-8b84-a11879b04e02&response_mode=fragment&response_type=code&scope=openid&nonce=b7152293-674e-4ef9-87f9-71deb5f2761f"

/**
 * Defines the express api.
 * Adds the routes.
 * @TODO Maybe later as generics instead of every single one.
 */
export abstract class Api {

  /**
   * The express router for the User.
   */
  private static _routerUser: express.Router = express
    .Router()
    .post("/", UserController.createData)
    .get("/", UserController.readData)
    .put("/:id", UserController.updateData)
    .delete("/:id", UserController.deleteData);

  /**
   * Get the express router for User.
   * @returns The express router for User.
   */
  public static get routerUser(): express.Router {
    return this._routerUser;
  }

  /**
   * Set the express router for User.
   * @param v The express router for User.
   */
  public static set routerUser(v: express.Router) {
    this._routerUser = v;
  }

  /**
   * The express router for the Offer.
   */
  private static _routerOffer: express.Router = express
    .Router()
    .post("/", OfferController.createData)
    .get("/",OfferController.readData)
    .put("/:id",OfferController.updateData)
    .delete("/:id",OfferController.deleteData)

  /**
   * Get the express router for Offer.
   * @returns The express router for Offer.
   */
  public static get routerOffer(): express.Router {
    return this._routerOffer;
  }
  /**
   * Set the express router for Offer.
   * @param v The express router for Offer.
   */
  public static set routerOffer(v: express.Router) {
    this._routerOffer = v;
  }

  /**
   * The express router for the Image.
   */
  private static _routerImage: express.Router = express
    .Router()
    .post("/", upload.single("file"), function(req, res){
      res.status(200).json((req as any).file.filename);
    })
    .get("/", ImageController.readData)
    .put("/:id", ImageController.updateData)
    .delete("/:id", ImageController.deleteData)

    /**
   * Get the express router for Image.
   * @returns The express router for Image.
   */
  public static get routerImage(): express.Router {
    return this._routerImage;
  }

  /**
   * Set the express router for Image.
   * @param v The express router for Image.
   */
  public static set routeImage(v: express.Router) {
    this._routerImage = v;
  }

  /**
   * The express router for the Chat.
   */
  private static _routerChat: express.Router = express
    .Router()
    .post("/", ChatController.createData)
    .get("/", ChatController.readData)
    .put("/:id", ChatController.updateData)
    .delete("/:id", ChatController.deleteData)

    /**
   * Get the express router for Chat.
   * @returns The express router for Chat.
   */
  public static get routerChat(): express.Router {
    return this._routerChat;
  }

  /**
   * Set the express router for Chat.
   * @param v The express router for Chat.
   */
  public static set routerChat(v: express.Router) {
    this._routerChat = v;
  }
  
  /**
   * The express router for the Message.
   */
  private static _routerMessage: express.Router = express
    .Router()
    .post("/", MessageController.createData)
    .get("/", MessageController.readData)
    .put("/:id", MessageController.updateData)
    .delete("/:id", MessageController.deleteData)

  /**
   * Get the express router for Message.
   * @returns The express router for Message.
   */
  public static get routerMessage(): express.Router {
      return this._routerMessage;
  }
  /**
   * Set the express router for Message.
   * @param v The express router for Message.
   */
  public static set routerMessage(v: express.Router) {
    this._routerMessage = v;
  }

  /**
   * The express router for the Userchat.
   */
  private static _routerUserchat: express.Router = express
    .Router()
    .post("/", UserChatController.createData)
    .get("/", UserChatController.readData)
    .put("/:id", UserChatController.updateData)
    .delete("/:id", UserChatController.deleteData)

    /**
   * Get the express router for Userchat.
   * @returns The express router for Userchat.
   */
  public static get routerUserchat(): express.Router {
    return this._routerUserchat;
  }
  /**
   * Set the express router for Userchat.
   * @param v The express router for Userchat.
   */
  public static set routerUserChat(v: express.Router){
    this._routerUserchat = v;
  }

  /**
   * The express router for the UserwatchList.
   */
  private static _routerUserwatchList: express.Router = express
    .Router()
    .post("/", UserWatchlistController.createData)
    .get("/", UserWatchlistController.readData)
    .put("/:id", UserWatchlistController.updateData)
    .delete("/:id", UserWatchlistController.deleteData)

    /**
   * Get the express router for UserwatchList.
   * @returns The express router for UserwatchList.
   */
  public static get routerUserwatchList(): express.Router {
    return this._routerUserwatchList;
  }

  /**
   * Set the express router for UserwatchList.
   * @param v The express router for UserwatchList.
   */
  public static set routerUserwatchList(v:express.Router) {
    this._routerUserwatchList = v;
  }

    /**
   * The express router for the Counter.
   */
     private static _routerCounter: express.Router = express
     .Router()
     .post("/", CounterController.createData)
     .get("/", CounterController.readData)
     .put("/:id", CounterController.updateData)
     .delete("/:id", CounterController.deleteData)
 
     /**
    * Get the express router for Counter.
    * @returns The express router for Counter.
    */
   public static get routerCounter(): express.Router {
     return this._routerCounter;
   }
 
   /**
    * Set the express router for Counter.
    * @param v The express router for Counter.
    */
   public static set routerCounter(v:express.Router) {
     this._routerCounter = v;
   }
}

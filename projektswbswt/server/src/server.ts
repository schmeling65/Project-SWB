// Importing required modules
import * as express from "express";
import * as cors from "cors";
import * as dotenv from "dotenv";
import { Api } from "./routes/api";
const mongodbjs = require("./helpers/db/mongodb");

/**
 * The Server. Contains the Application.
 */
export abstract class Server {
  /**
   * The express application
   */
  private static _app: express.Application = express();

  /**
   * @returns The express application.
   */
  public static get app(): express.Application {
    return Server._app;
  }
  /**
   * TODO: Check if this is needed.
   * @param v - An express application.
   */
  public static set app(v: express.Application) {
    Server._app = v;
  }

  /**
   * Start the Server
   */
  public static StartServer() {
    // parse env variables
    dotenv.config();
    mongodbjs();

    // Configuring port
    var port = process.env.PORT || 9000;

    // Configure middlewares
    Server.app.use(cors());
    Server.app.use(express.json());
    Server.app.set("view engine", "html");

    // Static folder
    Server.app.use(express.static(__dirname + "/views/"));

    // Defining route middleware
    Server.app.use("/user", Api.routerUser);
    Server.app.use("/offer", Api.routerOffer);
    Server.app.use("/image", Api.routerImage);
    Server.app.use("/chat", Api.routerChat);
    Server.app.use("/messages", Api.routerMessage);
    Server.app.use("/userchat", Api.routerUserchat);
    Server.app.use("/userwatchlist", Api.routerUserwatchList);

    // Listening to port
    Server.app.listen(port);
    console.log("Listening On http://localhost:" + port + "/user");
  }
}

/**
 * Start the Server
 */
Server.StartServer();

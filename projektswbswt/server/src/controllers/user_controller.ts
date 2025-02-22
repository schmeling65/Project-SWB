import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
import { counters } from "../helpers/db/counters";
import * as User from "../models/user_schema";
import { BaseController } from "./baseController";
/**
 *
 */
export class UserController extends BaseController {
  /**
   * @inheritdoc
   */
  public static createData(req: any, res: any): void {
    UserController.baseCreateData(req, res, User, "userId");
  }

  /**
   * @inheritdoc
   */
  public static readData(req: any, res: any) {
    //Falls kein keycloakStringID dabei ist, werden alle User gelesen.
    if (typeof req.query.keycloakStringID === "undefined") {
      if (typeof req.query.id === "undefined") {
      UserController.baseReadData(req, res, User);
      }
      else{
        (User as any)
          .find({id: req.query.id})
          .then((data) => {
            console.log(data)
            if (data.length > 1) {
              console.error("Duplicated ids for Users found");
            }
            else if (data.length < 1) {
              console.error("None User found")
            }
            else {
              res.status(200).json(data)
            }
          })
      }
    } 
    //Ansonsten wird in der Datenbank nach dem Attribut keycloakStringID gesucht
    else {
      (User as any)
        .find({ keycloakStringID: req.query.keycloakStringID })
    //Wenn kein Benutzer gefunden wurde, wird ein neuer User in der Datenbank erstellt mit dem value aus keycloak        
        .then((data) => {
          if (data.length < 1) {
    //Eine neue UserId wird erstellt und dem requestbody zusammen mit der keycloakID geschickt um einen neuen Benutzer zu erstellen
            counters.getNextSquenceValue("userId").then((newUserId) => {
              req.body.id = newUserId;
              req.body.keycloakStringID = req.query.keycloakStringID;
              (User as any)
                .create(req.body)
                .then((data) => {
                  res.status(201).json(data);
                })
                .catch((err) => {
                  if (err.name === "ValidationError") {
                    console.error("Error Validating!", err);
                    res.status(422).json(err);
                  } else {
                    console.error(err);
                    res.status(500).json(err);
                  }
                });
            });
          } 
    //Falls ein Benutzer gefunden wurde, wird dieser zurückgegeben
          else if (data.length == 1) {
            res.status(200).json(data);
          }
    //Falls mehrere Benutzer gefunden werden, wird ein Fehler geschmissen, da dies nicht sein darf
          else {
            console.error("Too many Users with the same keycloakStringId")
          }
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json(err);
        });
    }
  }

  /**
   * @inheritdoc
   */
  public static updateData(req: any, res: any) {
    UserController.baseUpdateData(req, res, User);
  }

  /**
   * @inheritdoc
   */
  public static deleteData(req: any, res: any) {
    UserController.baseDeleteData(req, res, User);
  }
}

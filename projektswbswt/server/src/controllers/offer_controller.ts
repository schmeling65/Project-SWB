import { Model } from "mongoose";
import * as Offer from "../models/offer_schema";
import { BaseController } from "./baseController";
import * as fs from "fs";

/**
 *
 */
export class OfferController extends BaseController {
  /**
   * @inheritdoc
   */
  public static createData(req: any, res: any): void {
    OfferController.baseCreateData(req, res, Offer, "offerId");
  }

  /**
   * @inheritdoc
   */
  public static readData(req: any, res: any) {
    const pageSize = 20;
    const page = req.query.pageNr;

    (Offer as any)
      .find(OfferController.getSearchParams(req))
      .sort(OfferController.getSortParams(req))
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  }

  /**
   * Update an Offer
   */
  public static updateData(req: any, res: any) {
    var updateParams = {
      name: req.body.name,
      text: req.body.text,
      offertype: req.body.offertype,
      price: req.body.price,
      location: req.body.location,
    };
    var offerId = req.params.id;

    (Offer as any)
      .updateOne({ id: offerId }, updateParams)
      .then((data) => {
        console.log("Offer updated!");
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
  }

  /**
   * @inheritdoc
   */
  public static deleteData(req: any, res: any) {
    (Offer as any)
      .find({ id: req.params.id })
      .then((data) => {
        if (!data) {
          throw new Error(
            (Offer as any) + " with ID: " + req.params.id + " not available"
          );
        }
        // Delete Image
        fs.unlinkSync("../client/public/" + data[0].filename);
        return data[0].remove();
      })
      .then((data) => {
        console.log((Offer as any) + " with ID: " + req.params.id + "removed!");
        res.status(200).json(data);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  }
  
  /**
   * Get search parameters
   * @param req The request
   * @returns The search parameter for the offers
   */
  private static getSearchParams(req: any): any {
    const searchString = req.query?.name;
    const searchRegex = new RegExp(searchString, "i");
    const offertype = req.query?.offertype;
    var searchParam = {};
    if (offertype == 1 || offertype == 0) {
      searchParam = {
        $and: [
          {
            offertype: offertype,
            $or: [
              { name: { $regex: searchRegex } },
              { text: { $regex: searchRegex } },
            ],
          },
        ],
      };
    } else {
      searchParam = {
        $or: [
          { name: { $regex: searchRegex } },
          { text: { $regex: searchRegex } },
        ],
      };
    }
    return searchParam;
  }

  /**
   * Get sort parameters
   * @param req The request
   * @returns The sort parameters for the offers
   */
  private static getSortParams(req: any): any {
    let sortparam = {};
    sortparam = { createdAt: -1 };
    if (req.query.sortByPrice == -1 || req.query.sortByPrice == 1) {
      // Other values than -1 or 1 would create an error
      sortparam = { price: req.query.sortByPrice as number, createdAt: -1 };
    }
    return sortparam;
  }
}

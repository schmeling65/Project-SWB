import { counters } from "../helpers/db/counters";

/**
 * Base Controller. Contains function to create, read, update and delete items.
 */
export abstract class BaseController {
  // TODO: Types
  
  /**
   * Create Data.
   * @param req The Request.
   * @param res The Response.
   */
  protected static async baseCreateData(req: any, res: any, model: any, sequenceName: string): Promise<void> {
    req.body.id = await counters.getNextSquenceValue(sequenceName);
    model
      .create(req.body)
      .then((data) => {
        console.log("New" + model.name + "Created!", data);
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
   * Reads Data.
   * @param req The Request.
   * @param res The Response.
   */
   protected static baseReadData(req: any, res: any, model: any): void {
    model
      .find()
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  }

  /**
   * Updates Data.
   * @param req The Request.
   * @param res The Response.
   */
   protected static baseUpdateData(req: any, res: any, model: any): void {
    model
      .findByIdAndUpdate(req.params.id, req.body, {
        useFindAndModify: false,
        new: true,
      })
      .then((data) => {
        console.log(model + "updated!");
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
   * Deletes Data.
   * @param req The Request.
   * @param res The Response.
   */
   protected static baseDeleteData(req: any, res: any, model: any): void {
    model
      .find({id: req.params.id})
      .then((data) => {
        if (!data) {
          throw new Error(
            model + " with ID: " + req.params.id + " not available"
          );
        }
        return data[0].remove();
      })
      .then((data) => {
        console.log(model + " with ID: " + req.params.id + "removed!");
        res.status(200).json(data);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  }
}

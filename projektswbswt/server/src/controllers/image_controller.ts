import * as Image from "../models/image_schema";
import { BaseController } from "./baseController";

/**
 *
 */
 export class ImageController extends BaseController {
  /**
   * @inheritdoc
   */
  public static createData(req: any, res: any): void {
    ImageController.baseCreateData(req, res, Image, "imageId");
  }

  /**
   * @inheritdoc
   */
  public static readData(req: any, res: any) {
    ImageController.baseReadData(req, res, Image);
  }

  /**
   * @inheritdoc
   */
  public static updateData(req: any, res: any) {
    ImageController.baseUpdateData(req, res, Image);
  }

  /**
   * @inheritdoc
   */
  public static deleteData(req: any, res: any) {
    ImageController.baseDeleteData(req, res, Image);
  }
};

import * as Message from "../models/message_schema";
import { BaseController } from "./baseController";

/**
 *
 */
 export class MessageController extends BaseController {
  /**
   * @inheritdoc
   */
  public static createData(req: any, res: any): void {
    MessageController.baseCreateData(req, res, Message, "messageId");
  }

  /**
   * @inheritdoc
   */
  public static readData(req: any, res: any) {
    MessageController.baseReadData(req, res, Message);
  }

  /**
   * @inheritdoc
   */
  public static updateData(req: any, res: any) {
    MessageController.baseUpdateData(req, res, Message);
  }

  /**
   * @inheritdoc
   */
  public static deleteData(req: any, res: any) {
    MessageController.baseDeleteData(req, res, Message);
  }
};

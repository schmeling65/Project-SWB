import * as Chat from "../models/chat_schema";
import { BaseController } from "./baseController";

/**
 * Controller for Chat entities
 */
export class ChatController extends BaseController {
  /**
   * @inheritdoc
   */
  public static createData(req: any, res: any): void {
    ChatController.baseCreateData(req, res, Chat, "chatId");
  }

  /**
   * @inheritdoc
   */
  public static readData(req: any, res: any) {
    ChatController.baseReadData(req, res, Chat);
  }

  /**
   * @inheritdoc
   */
  public static updateData(req: any, res: any) {
    ChatController.baseUpdateData(req, res, Chat);
  }

  /**
   * @inheritdoc
   */
  public static deleteData(req: any, res: any) {
    ChatController.baseDeleteData(req, res, Chat);
  }
}

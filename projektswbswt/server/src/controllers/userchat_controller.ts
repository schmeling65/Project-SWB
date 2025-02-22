import * as Userchat from "../models/userchat_schema";
import { BaseController } from "./baseController";

/**
 *
 */
export class UserChatController extends BaseController {
  /**
   * @inheritdoc
   */
  public static createData(req: any, res: any): void {
    UserChatController.baseCreateData(req, res, Userchat, "userChatId");
  }

  /**
   * @inheritdoc
   */
  public static readData(req: any, res: any) {
    UserChatController.baseReadData(req, res, Userchat);
  }

  /**
   * @inheritdoc
   */
  public static updateData(req: any, res: any) {
    UserChatController.baseUpdateData(req, res, Userchat);
  }

  /**
   * @inheritdoc
   */
  public static deleteData(req: any, res: any) {
    UserChatController.baseDeleteData(req, res, Userchat);
  }
}

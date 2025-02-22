import * as UserWatchlist from "../models/userwatchlist_schema";
import { BaseController } from "./baseController";

/**
 *
 */
export class UserWatchlistController extends BaseController {
  /**
   * @inheritdoc
   */
  public static createData(req: any, res: any): void {
    UserWatchlistController.baseCreateData(req, res, UserWatchlist,"userWatchlistId");
  }

  /**
   * @inheritdoc
   */
  public static readData(req: any, res: any) {
    UserWatchlistController.baseReadData(req, res, UserWatchlist);
  }

  /**
   * @inheritdoc
   */
  public static updateData(req: any, res: any) {
    UserWatchlistController.baseUpdateData(req, res, UserWatchlist);
  }

  /**
   * @inheritdoc
   */
  public static deleteData(req: any, res: any) {
    UserWatchlistController.baseDeleteData(req, res, UserWatchlist);
  }
}

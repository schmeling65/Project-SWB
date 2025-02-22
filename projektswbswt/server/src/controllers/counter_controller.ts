import * as Counter from "../models/counters_schema";
import { BaseController } from "./baseController";

/**
 * Controller for Counter entities
 */
export class CounterController extends BaseController {
  /**
   * @inheritdoc
   */
  public static createData(req: any, res: any): void {
    CounterController.baseCreateData(req, res, Counter, "counterId");
  }

  /**
   * @inheritdoc
   */
  public static readData(req: any, res: any) {
    CounterController.baseReadData(req, res, Counter);
  }

  /**
   * @inheritdoc
   */
  public static updateData(req: any, res: any) {
    CounterController.baseUpdateData(req, res, Counter);
  }

  /**
   * @inheritdoc
   */
  public static deleteData(req: any, res: any) {
    CounterController.baseDeleteData(req, res, Counter);
  }
}

import { AbstractBaseFizzBuzzComputedOutcomeTransferObject } from "./AbstractBaseFizzBuzzComputedOutcomeTransferObject.js";

const TRANSFER_OBJECT_NAME = "FizzBuzzComputedOutcomeTransferObject";
const TRANSFER_OBJECT_VERSION = "1.0.0-DTO-TRANSFER-OBJECT";

export class FizzBuzzComputedOutcomeTransferObjectImpl
  extends AbstractBaseFizzBuzzComputedOutcomeTransferObject
{
  protected override readonly transferObjectName: string = TRANSFER_OBJECT_NAME;
  protected override readonly transferObjectVersion: string = TRANSFER_OBJECT_VERSION;

  constructor(primaryKey: number, inputValue: number, computedValue: string) {
    super(primaryKey, inputValue, computedValue);
  }
}

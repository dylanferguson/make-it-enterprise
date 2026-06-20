import { AbstractBaseFizzBuzzComputedOutcomeEntity } from "./AbstractBaseFizzBuzzComputedOutcomeEntity.js";

const ENTITY_NAME = "FizzBuzzComputedOutcomeEntityBean";
const ENTITY_VERSION = "1.0.0-CMP-ENTITY-BEAN";

export class FizzBuzzComputedOutcomeEntityBeanImpl
  extends AbstractBaseFizzBuzzComputedOutcomeEntity
{
  protected override readonly entityName: string = ENTITY_NAME;
  protected override readonly entityVersion: string = ENTITY_VERSION;

  constructor(primaryKey?: number, inputValue?: number, computedOutcome?: string) {
    super();
    if (primaryKey !== undefined) this.primaryKey = primaryKey;
    if (inputValue !== undefined) this.inputValue = inputValue;
    if (computedOutcome !== undefined) this.computedOutcome = computedOutcome;
    this.entityCreationTimestamp = Date.now();
  }
}

import type { IFizzBuzzComputedOutcomeEntity } from "./IFizzBuzzComputedOutcomeEntity.js";
import { AbstractBaseFizzBuzzComputedOutcomeEntityHome } from "./AbstractBaseFizzBuzzComputedOutcomeEntityHome.js";
import { FizzBuzzComputedOutcomeEntityBeanImpl } from "./FizzBuzzComputedOutcomeEntityBeanImpl.js";

const HOME_NAME = "FizzBuzzComputedOutcomeEntityHome";
const HOME_VERSION = "1.0.0-ENTITY-HOME-CMP";
const SUPPORTED_ENTITY_NAME = "FizzBuzzComputedOutcomeEntityBean";

export class FizzBuzzComputedOutcomeEntityHomeImpl
  extends AbstractBaseFizzBuzzComputedOutcomeEntityHome
{
  protected override readonly homeName: string = HOME_NAME;
  protected override readonly homeVersion: string = HOME_VERSION;
  protected override readonly supportedEntityName: string = SUPPORTED_ENTITY_NAME;

  override create(
    primaryKey: number,
    inputValue: number,
    computedOutcome: string,
  ): IFizzBuzzComputedOutcomeEntity {
    const existing = this.findByPrimaryKey(primaryKey);
    if (existing !== null) {
      return existing;
    }
    const entity = new FizzBuzzComputedOutcomeEntityBeanImpl(
      primaryKey,
      inputValue,
      computedOutcome,
    );
    this.registerEntity(entity);
    return entity;
  }
}

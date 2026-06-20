import type { IFizzBuzzComputedOutcomeEntity } from "./IFizzBuzzComputedOutcomeEntity.js";
import type { IFizzBuzzComputedOutcomeEntityHome } from "./IFizzBuzzComputedOutcomeEntityHome.js";

export abstract class AbstractBaseFizzBuzzComputedOutcomeEntityHome
  implements IFizzBuzzComputedOutcomeEntityHome
{
  protected readonly entities: Map<number, IFizzBuzzComputedOutcomeEntity> = new Map();
  protected abstract readonly homeName: string;
  protected abstract readonly homeVersion: string;
  protected abstract readonly supportedEntityName: string;

  abstract create(
    primaryKey: number,
    inputValue: number,
    computedOutcome: string,
  ): IFizzBuzzComputedOutcomeEntity;

  findByPrimaryKey(primaryKey: number): IFizzBuzzComputedOutcomeEntity | null {
    return this.entities.get(primaryKey) ?? null;
  }

  findAll(): readonly IFizzBuzzComputedOutcomeEntity[] {
    return Array.from(this.entities.values());
  }

  findByInputValue(inputValue: number): readonly IFizzBuzzComputedOutcomeEntity[] {
    return Array.from(this.entities.values()).filter(
      (e) => e.getInputValue() === inputValue,
    );
  }

  remove(primaryKey: number): boolean {
    const entity = this.entities.get(primaryKey);
    if (entity !== undefined) {
      entity.ejbRemove();
      return this.entities.delete(primaryKey);
    }
    return false;
  }

  getHomeName(): string {
    return this.homeName;
  }

  getHomeVersion(): string {
    return this.homeVersion;
  }

  getEntityBeanCount(): number {
    return this.entities.size;
  }

  getSupportedEntityName(): string {
    return this.supportedEntityName;
  }

  protected registerEntity(entity: IFizzBuzzComputedOutcomeEntity): void {
    entity.markManaged();
    this.entities.set(entity.getEntityPrimaryKey(), entity);
  }
}

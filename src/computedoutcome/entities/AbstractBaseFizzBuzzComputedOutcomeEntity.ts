import type { IFizzBuzzComputedOutcomeEntity } from "./IFizzBuzzComputedOutcomeEntity.js";

export abstract class AbstractBaseFizzBuzzComputedOutcomeEntity
  implements IFizzBuzzComputedOutcomeEntity
{
  protected primaryKey: number = 0;
  protected inputValue: number = 0;
  protected computedOutcome: string = "";
  protected entityCreationTimestamp: number = 0;
  protected managed: boolean = false;
  protected dirty: boolean = false;
  protected abstract readonly entityName: string;
  protected abstract readonly entityVersion: string;

  getEntityPrimaryKey(): number {
    return this.primaryKey;
  }

  setEntityPrimaryKey(primaryKey: number): void {
    this.primaryKey = primaryKey;
    this.markDirty();
  }

  getInputValue(): number {
    return this.inputValue;
  }

  setInputValue(inputValue: number): void {
    this.inputValue = inputValue;
    this.markDirty();
  }

  getComputedOutcome(): string {
    return this.computedOutcome;
  }

  setComputedOutcome(computedOutcome: string): void {
    this.computedOutcome = computedOutcome;
    this.markDirty();
  }

  getEntityCreationTimestamp(): number {
    return this.entityCreationTimestamp;
  }

  setEntityCreationTimestamp(timestamp: number): void {
    this.entityCreationTimestamp = timestamp;
  }

  isEntityManaged(): boolean {
    return this.managed;
  }

  markManaged(): void {
    this.managed = true;
  }

  markDirty(): void {
    if (this.managed) {
      this.dirty = true;
    }
  }

  isDirty(): boolean {
    return this.dirty;
  }

  getEntityName(): string {
    return this.entityName;
  }

  getEntityVersion(): string {
    return this.entityVersion;
  }

  ejbActivate(): void {
    console.debug(`[${this.entityName}] ejbActivate invoked for pk=[${this.primaryKey}]`);
  }

  ejbPassivate(): void {
    console.debug(`[${this.entityName}] ejbPassivate invoked for pk=[${this.primaryKey}]`);
  }

  ejbLoad(): void {
    console.debug(`[${this.entityName}] ejbLoad invoked for pk=[${this.primaryKey}]`);
    this.dirty = false;
  }

  ejbStore(): void {
    console.debug(`[${this.entityName}] ejbStore invoked for pk=[${this.primaryKey}]`);
    this.dirty = false;
  }

  ejbRemove(): void {
    console.debug(`[${this.entityName}] ejbRemove invoked for pk=[${this.primaryKey}]`);
    this.managed = false;
    this.dirty = false;
  }
}

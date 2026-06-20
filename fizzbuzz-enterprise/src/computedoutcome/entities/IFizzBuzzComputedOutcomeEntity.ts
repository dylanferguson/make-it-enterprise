export interface IFizzBuzzComputedOutcomeEntity {
  getEntityPrimaryKey(): number;
  setEntityPrimaryKey(primaryKey: number): void;
  getInputValue(): number;
  setInputValue(inputValue: number): void;
  getComputedOutcome(): string;
  setComputedOutcome(computedOutcome: string): void;
  getEntityCreationTimestamp(): number;
  setEntityCreationTimestamp(timestamp: number): void;
  isEntityManaged(): boolean;
  markManaged(): void;
  markDirty(): void;
  isDirty(): boolean;
  getEntityName(): string;
  getEntityVersion(): string;
  ejbActivate(): void;
  ejbPassivate(): void;
  ejbLoad(): void;
  ejbStore(): void;
  ejbRemove(): void;
}

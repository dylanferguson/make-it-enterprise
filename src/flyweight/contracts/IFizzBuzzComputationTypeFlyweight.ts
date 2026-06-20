export interface IFizzBuzzComputationTypeFlyweight {
  getTypeName(): string;
  getTypeIdentifier(): string;
  getTypeVersion(): string;
  getDivisor(): number;
  getDisplayLabel(): string;
  getOrdinalPriority(): number;
  evaluate(value: number): boolean;
}


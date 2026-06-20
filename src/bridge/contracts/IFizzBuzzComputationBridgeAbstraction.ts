export interface IFizzBuzzComputationBridgeAbstraction {
  getBridgeName(): string;
  getBridgeVersion(): string;
  resolveComputedValue(value: number, divisor: number): number;
  resolveComputedClassification(value: number, divisor: number): boolean;
}


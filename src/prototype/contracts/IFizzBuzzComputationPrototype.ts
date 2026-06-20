export interface IFizzBuzzComputationPrototype {
  getPrototypeName(): string;
  getPrototypeIdentifier(): string;
  getPrototypeVersion(): string;
  clone(): IFizzBuzzComputationPrototype;
  configure(configuration: Record<string, unknown>): void;
  getConfiguration(): Record<string, unknown>;
  isConfigurable(): boolean;
}


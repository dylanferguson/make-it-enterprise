export interface IFizzBuzzComputationCommand<T> {
  getCommandDescriptor(): string;
  getCommandVersion(): string;
  getCommandTypeName(): string;
  getInput(): T;
  execute(): unknown;
  isExecuted(): boolean;
  getExecutionTimestamp(): number | null;
  setExecutionTimestamp(timestamp: number): void;
}

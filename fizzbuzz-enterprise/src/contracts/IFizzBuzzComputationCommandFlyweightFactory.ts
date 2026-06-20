import type { IFizzBuzzComputationCommand } from "./IFizzBuzzComputationCommand.js";

export interface IFizzBuzzComputationCommandFlyweightFactory {
  acquireCommand(commandKey: string, factory: () => IFizzBuzzComputationCommand): IFizzBuzzComputationCommand;
  releaseCommand(commandKey: string): boolean;
  getCachedCommand(commandKey: string): IFizzBuzzComputationCommand | null;
  getFlyweightFactoryName(): string;
  getFlyweightFactoryVersion(): string;
  getCacheSize(): number;
  clearCache(): void;
}

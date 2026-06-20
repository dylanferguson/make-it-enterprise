import type { IFizzBuzzComputationCommand } from "../contracts/IFizzBuzzComputationCommand.js";
import type { IFizzBuzzComputationCommandFlyweightFactory } from "../contracts/IFizzBuzzComputationCommandFlyweightFactory.js";

export abstract class AbstractBaseFizzBuzzComputationCommandFlyweightFactory
  implements IFizzBuzzComputationCommandFlyweightFactory
{
  protected static readonly FLYWEIGHT_FRAMEWORK_VERSION = "1.0.0-FLYWEIGHT-FRAMEWORK";
  protected static readonly DEFAULT_CACHE_CAPACITY = 50;

  abstract acquireCommand(commandKey: string, factory: () => IFizzBuzzComputationCommand): IFizzBuzzComputationCommand;
  abstract releaseCommand(commandKey: string): boolean;
  abstract getCachedCommand(commandKey: string): IFizzBuzzComputationCommand | null;
  abstract getFlyweightFactoryName(): string;
  abstract getFlyweightFactoryVersion(): string;
  abstract getCacheSize(): number;
  abstract clearCache(): void;

  protected generateCacheKey(commandName: string, contextProfile: string): string {
    return `${commandName}::${contextProfile}::${AbstractBaseFizzBuzzComputationCommandFlyweightFactory.FLYWEIGHT_FRAMEWORK_VERSION}`;
  }

  protected validateCommandFactory(factory: () => IFizzBuzzComputationCommand): void {
    if (typeof factory !== "function") {
      throw new Error(
        `[${this.getFlyweightFactoryName()}] Command factory must be a function, received: ${typeof factory}`,
      );
    }
  }
}

import { AbstractBaseFizzBuzzComputationCommandFlyweightFactory } from "../../abstracts/AbstractBaseFizzBuzzComputationCommandFlyweightFactory.js";
import type { IFizzBuzzComputationCommand } from "../../contracts/IFizzBuzzComputationCommand.js";
import type { IFizzBuzzComputationCommandFlyweightFactory } from "../../contracts/IFizzBuzzComputationCommandFlyweightFactory.js";

interface FlyweightCacheEntry {
  command: IFizzBuzzComputationCommand;
  acquireCount: number;
}

export class FizzBuzzComputationCommandFlyweightFactoryImpl
  extends AbstractBaseFizzBuzzComputationCommandFlyweightFactory
  implements IFizzBuzzComputationCommandFlyweightFactory
{
  private static readonly FACTORY_NAME = "FizzBuzzComputationCommandFlyweightFactory";
  private static readonly FACTORY_VERSION = "1.0.0-ENTERPRISE-FLYWEIGHT";

  private static readonly cache: Map<string, FlyweightCacheEntry> = new Map();

  override acquireCommand(commandKey: string, factory: () => IFizzBuzzComputationCommand): IFizzBuzzComputationCommand {
    this.validateCommandFactory(factory);
    const existing = FizzBuzzComputationCommandFlyweightFactoryImpl.cache.get(commandKey);
    if (existing) {
      existing.acquireCount++;
      return existing.command;
    }
    const command = factory();
    FizzBuzzComputationCommandFlyweightFactoryImpl.cache.set(commandKey, {
      command,
      acquireCount: 1,
    });
    return command;
  }

  override releaseCommand(commandKey: string): boolean {
    const existing = FizzBuzzComputationCommandFlyweightFactoryImpl.cache.get(commandKey);
    if (!existing) {
      return false;
    }
    existing.acquireCount--;
    if (existing.acquireCount <= 0) {
      FizzBuzzComputationCommandFlyweightFactoryImpl.cache.delete(commandKey);
    }
    return true;
  }

  override getCachedCommand(commandKey: string): IFizzBuzzComputationCommand | null {
    const existing = FizzBuzzComputationCommandFlyweightFactoryImpl.cache.get(commandKey);
    return existing ? existing.command : null;
  }

  override getFlyweightFactoryName(): string {
    return FizzBuzzComputationCommandFlyweightFactoryImpl.FACTORY_NAME;
  }

  override getFlyweightFactoryVersion(): string {
    return FizzBuzzComputationCommandFlyweightFactoryImpl.FACTORY_VERSION;
  }

  override getCacheSize(): number {
    return FizzBuzzComputationCommandFlyweightFactoryImpl.cache.size;
  }

  override clearCache(): void {
    FizzBuzzComputationCommandFlyweightFactoryImpl.cache.clear();
  }
}

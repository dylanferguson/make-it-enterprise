import { AbstractBaseFizzBuzzComputationCommandDecorator } from "../../abstracts/AbstractBaseFizzBuzzComputationCommandDecorator.js";
import type { IFizzBuzzComputationCommand } from "../../contracts/IFizzBuzzComputationCommand.js";
import type { IFizzBuzzComputationRequest } from "../../contracts/IFizzBuzzComputationRequest.js";
import type { IFizzBuzzComputationResponse } from "../../contracts/IFizzBuzzComputationResponse.js";
import type { IFizzBuzzComputationCommandFlyweightFactory } from "../../contracts/IFizzBuzzComputationCommandFlyweightFactory.js";
import { FizzBuzzComputationCommandFlyweightFactoryFactory } from "../factories/FizzBuzzComputationCommandFlyweightFactoryFactory.js";

export class FlyweightManagedFizzBuzzComputationCommandDecoratorImpl
  extends AbstractBaseFizzBuzzComputationCommandDecorator
{
  private static readonly DECORATOR_NAME = "FlyweightManagedFizzBuzzComputationCommandDecorator";
  private static readonly DECORATOR_VERSION = "1.0.0-ENTERPRISE-FLYWEIGHT-MANAGEMENT";
  private static readonly COMMAND_NAME = "FlyweightManagedFizzBuzzComputationCommand";
  private static readonly COMMAND_VERSION = "1.0.0-FLYWEIGHT-MANAGED";
  private static readonly COMMAND_GROUP = "FIZZBUZZ_FLYWEIGHT_MANAGED_RESOLUTION";
  private static readonly FLYWEIGHT_CACHE_KEY = "fizzbuzz:resolution:command:v1";

  private flyweightFactory: IFizzBuzzComputationCommandFlyweightFactory | null = null;
  private factoryResolutionAttempted = false;

  constructor(wrappedCommand: IFizzBuzzComputationCommand) {
    super(wrappedCommand);
  }

  override execute(request: IFizzBuzzComputationRequest): IFizzBuzzComputationResponse {
    const factory = this.resolveFlyweightFactory();
    if (factory !== null) {
      const managedCommand = factory.acquireCommand(
        FlyweightManagedFizzBuzzComputationCommandDecoratorImpl.FLYWEIGHT_CACHE_KEY,
        () => this.wrappedCommand,
      );
      try {
        return managedCommand.execute(request);
      } finally {
        factory.releaseCommand(
          FlyweightManagedFizzBuzzComputationCommandDecoratorImpl.FLYWEIGHT_CACHE_KEY,
        );
      }
    }
    return this.wrappedCommand.execute(request);
  }

  override getCommandName(): string {
    return FlyweightManagedFizzBuzzComputationCommandDecoratorImpl.COMMAND_NAME;
  }

  override getCommandVersion(): string {
    return FlyweightManagedFizzBuzzComputationCommandDecoratorImpl.COMMAND_VERSION;
  }

  override canExecute(input: number): boolean {
    return Number.isFinite(input) && input >= 0;
  }

  override getCommandGroup(): string {
    return FlyweightManagedFizzBuzzComputationCommandDecoratorImpl.COMMAND_GROUP;
  }

  override getDecoratorName(): string {
    return FlyweightManagedFizzBuzzComputationCommandDecoratorImpl.DECORATOR_NAME;
  }

  override getDecoratorVersion(): string {
    return FlyweightManagedFizzBuzzComputationCommandDecoratorImpl.DECORATOR_VERSION;
  }

  private resolveFlyweightFactory(): IFizzBuzzComputationCommandFlyweightFactory | null {
    if (!this.factoryResolutionAttempted) {
      this.factoryResolutionAttempted = true;
      try {
        this.flyweightFactory =
          FizzBuzzComputationCommandFlyweightFactoryFactory.createFlyweightFactory();
      } catch {
        this.flyweightFactory = null;
      }
    }
    return this.flyweightFactory;
  }
}

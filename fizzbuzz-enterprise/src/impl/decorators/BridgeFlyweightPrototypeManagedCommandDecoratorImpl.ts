import { AbstractBaseFizzBuzzComputationCommandDecorator } from "../../abstracts/AbstractBaseFizzBuzzComputationCommandDecorator.js";
import type { IFizzBuzzComputationCommand } from "../../contracts/IFizzBuzzComputationCommand.js";
import type { IFizzBuzzComputationRequest } from "../../contracts/IFizzBuzzComputationRequest.js";
import type { IFizzBuzzComputationResponse } from "../../contracts/IFizzBuzzComputationResponse.js";
import { EnterpriseFizzBuzzPatternIntegrationFacadeFactoryBeanFactory } from "../../bridge/factories/EnterpriseFizzBuzzPatternIntegrationFacadeFactoryBeanFactory.js";
import type { PatternIntegrationAwareFizzBuzzComputationBridgeAbstractionImpl } from "../../bridge/impl/bridges/PatternIntegrationAwareFizzBuzzComputationBridgeAbstractionImpl.js";

export class BridgeFlyweightPrototypeManagedCommandDecoratorImpl
  extends AbstractBaseFizzBuzzComputationCommandDecorator
{
  private static readonly DECORATOR_NAME = "BridgeFlyweightPrototypeManagedCommandDecorator";
  private static readonly DECORATOR_VERSION = "1.0.0-BFP-MANAGED-DECORATOR";
  private static readonly COMMAND_NAME = "BridgeFlyweightPrototypeManagedCommand";
  private static readonly COMMAND_VERSION = "1.0.0-BFP-MANAGED";
  private static readonly COMMAND_GROUP = "FIZZBUZZ_BFP_MANAGED_RESOLUTION";

  private bridge: PatternIntegrationAwareFizzBuzzComputationBridgeAbstractionImpl | null = null;
  private bootstrapAttempted = false;

  constructor(wrappedCommand: IFizzBuzzComputationCommand) {
    super(wrappedCommand);
  }

  override execute(request: IFizzBuzzComputationRequest): IFizzBuzzComputationResponse {
    const bridge = this.resolveBridge();
    if (bridge !== null) {
      const value = request.getRequestedValue();
      const label = bridge.resolveComputationTypeLabelViaFlyweight(value);
      if (label !== null) {
        console.debug(
          `[${BridgeFlyweightPrototypeManagedCommandDecoratorImpl.DECORATOR_NAME}] ` +
          `Bridge+Flyweight+Prototype classified value=[${value}] as type=[${label}]`,
        );
      }
    }
    return this.wrappedCommand.execute(request);
  }

  override getCommandName(): string {
    return BridgeFlyweightPrototypeManagedCommandDecoratorImpl.COMMAND_NAME;
  }

  override getCommandVersion(): string {
    return BridgeFlyweightPrototypeManagedCommandDecoratorImpl.COMMAND_VERSION;
  }

  override canExecute(input: number): boolean {
    return Number.isFinite(input) && input >= 0;
  }

  override getCommandGroup(): string {
    return BridgeFlyweightPrototypeManagedCommandDecoratorImpl.COMMAND_GROUP;
  }

  override getDecoratorName(): string {
    return BridgeFlyweightPrototypeManagedCommandDecoratorImpl.DECORATOR_NAME;
  }

  override getDecoratorVersion(): string {
    return BridgeFlyweightPrototypeManagedCommandDecoratorImpl.DECORATOR_VERSION;
  }

  private resolveBridge(): PatternIntegrationAwareFizzBuzzComputationBridgeAbstractionImpl | null {
    if (!this.bootstrapAttempted) {
      this.bootstrapAttempted = true;
      try {
        EnterpriseFizzBuzzPatternIntegrationFacadeFactoryBeanFactory
          .initializePatternIntegrationInfrastructure();
        this.bridge =
          EnterpriseFizzBuzzPatternIntegrationFacadeFactoryBeanFactory.getBridge();
      } catch {
        this.bridge = null;
      }
    }
    return this.bridge;
  }
}


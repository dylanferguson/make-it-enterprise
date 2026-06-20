import { AbstractBaseFizzBuzzComputationCommandDecorator } from "../../abstracts/AbstractBaseFizzBuzzComputationCommandDecorator.js";
import type { IFizzBuzzComputationCommand } from "../../contracts/IFizzBuzzComputationCommand.js";
import type { IFizzBuzzComputationRequest } from "../../contracts/IFizzBuzzComputationRequest.js";
import type { IFizzBuzzComputationResponse } from "../../contracts/IFizzBuzzComputationResponse.js";
import type { IComputationStrategySelectorStrategy } from "../../contracts/IComputationStrategySelectorStrategy.js";
import type { IEnterpriseComputationStrategySelectionContext } from "../../contracts/IEnterpriseComputationStrategySelectionContext.js";
import { EnterpriseComputationStrategySelectorStrategyFactoryBeanFactoryRegistry } from "../registry/EnterpriseComputationStrategySelectorStrategyFactoryBeanFactoryRegistry.js";

export class StrategySelectorAwareFizzBuzzComputationCommandDecoratorImpl
  extends AbstractBaseFizzBuzzComputationCommandDecorator
{
  private static readonly DECORATOR_NAME = "StrategySelectorAwareFizzBuzzComputationCommandDecorator";
  private static readonly DECORATOR_VERSION = "1.0.0-ENTERPRISE-SELECTOR-AWARENESS";
  private static readonly COMMAND_NAME = "StrategySelectorAwareFizzBuzzComputationCommand";
  private static readonly COMMAND_VERSION = "1.0.0-SELECTOR-AWARE";
  private static readonly COMMAND_GROUP = "FIZZBUZZ_STRATEGY_SELECTOR_AWARE_RESOLUTION";

  private selectorStrategy: IComputationStrategySelectorStrategy | null = null;
  private selectorStrategyResolutionAttempted = false;

  constructor(wrappedCommand: IFizzBuzzComputationCommand) {
    super(wrappedCommand);
  }

  override execute(request: IFizzBuzzComputationRequest): IFizzBuzzComputationResponse {
    const value = request.getRequestedValue();
    const selectorStrategy = this.resolveSelectorStrategy();
    if (selectorStrategy !== null) {
      const selectionContext = this.buildSelectionContext(value, request);
      const selectedHandler = selectorStrategy.selectSelector(selectionContext);
      if (selectedHandler.canHandle(selectionContext)) {
        return this.wrappedCommand.execute(request);
      }
    }
    return this.wrappedCommand.execute(request);
  }

  override getCommandName(): string {
    return StrategySelectorAwareFizzBuzzComputationCommandDecoratorImpl.COMMAND_NAME;
  }

  override getCommandVersion(): string {
    return StrategySelectorAwareFizzBuzzComputationCommandDecoratorImpl.COMMAND_VERSION;
  }

  override canExecute(input: number): boolean {
    return Number.isFinite(input) && input >= 0;
  }

  override getCommandGroup(): string {
    return StrategySelectorAwareFizzBuzzComputationCommandDecoratorImpl.COMMAND_GROUP;
  }

  override getDecoratorName(): string {
    return StrategySelectorAwareFizzBuzzComputationCommandDecoratorImpl.DECORATOR_NAME;
  }

  override getDecoratorVersion(): string {
    return StrategySelectorAwareFizzBuzzComputationCommandDecoratorImpl.DECORATOR_VERSION;
  }

  private resolveSelectorStrategy(): IComputationStrategySelectorStrategy | null {
    if (!this.selectorStrategyResolutionAttempted) {
      this.selectorStrategyResolutionAttempted = true;
      try {
        this.selectorStrategy =
          EnterpriseComputationStrategySelectorStrategyFactoryBeanFactoryRegistry.resolveSelectorStrategy();
      } catch {
        this.selectorStrategy = null;
      }
    }
    return this.selectorStrategy;
  }

  private buildSelectionContext(value: number, request: IFizzBuzzComputationRequest): IEnterpriseComputationStrategySelectionContext {
    const metadata = new Map<string, unknown>();
    metadata.set("requestOrigin", request.getRequestOrigin());
    return {
      getRequest: () => request,
      getRequestedValue: () => value,
      getSelectionContextId: () => `sel:ctx:${value}:${request.getRequestId()}`,
      getSelectionProfile: () => "STANDARD",
      setSelectedStrategyName: (strategyName: string): void => { metadata.set("selectedStrategy", strategyName); },
      getSelectedStrategyName: (): string | null => (metadata.get("selectedStrategy") as string) ?? null,
      setSelectionDurationMs: (durationMs: number): void => { metadata.set("selectionDurationMs", durationMs); },
      getSelectionDurationMs: (): number => (metadata.get("selectionDurationMs") as number) ?? 0,
      getContextMetadata: () => metadata,
      setContextMetadata: (key: string, value: unknown): void => { metadata.set(key, value); },
    } as IEnterpriseComputationStrategySelectionContext;
  }
}

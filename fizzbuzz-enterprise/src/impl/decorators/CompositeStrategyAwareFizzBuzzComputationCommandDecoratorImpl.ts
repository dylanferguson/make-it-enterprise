import { AbstractBaseFizzBuzzComputationCommandDecorator } from "../../abstracts/AbstractBaseFizzBuzzComputationCommandDecorator.js";
import type { IFizzBuzzComputationCommand } from "../../contracts/IFizzBuzzComputationCommand.js";
import type { IFizzBuzzComputationRequest } from "../../contracts/IFizzBuzzComputationRequest.js";
import type { IFizzBuzzComputationResponse } from "../../contracts/IFizzBuzzComputationResponse.js";
import type { IEnterpriseFizzBuzzCompositeStrategyTree } from "../../contracts/IEnterpriseFizzBuzzCompositeStrategyTree.js";
import { FizzBuzzComputationResponseImpl } from "../dto/FizzBuzzComputationResponseImpl.js";

export class CompositeStrategyAwareFizzBuzzComputationCommandDecoratorImpl
  extends AbstractBaseFizzBuzzComputationCommandDecorator
{
  private static readonly DECORATOR_NAME = "CompositeStrategyAwareFizzBuzzComputationCommandDecorator";
  private static readonly DECORATOR_VERSION = "1.0.0-COMPOSITE-DECORATOR";
  private static readonly COMMAND_NAME = "CompositeStrategyAwareFizzBuzzComputationCommand";
  private static readonly COMMAND_VERSION = "1.0.0-COMPOSITE-AWARE-COMMAND";
  private static readonly COMMAND_GROUP = "FIZZBUZZ_COMPOSITE_STRATEGY_RESOLUTION";

  private readonly compositeStrategyTree: IEnterpriseFizzBuzzCompositeStrategyTree;
  private compositeResolvedCount: number = 0;
  private compositeDelegatedCount: number = 0;

  constructor(
    wrappedCommand: IFizzBuzzComputationCommand,
    compositeStrategyTree: IEnterpriseFizzBuzzCompositeStrategyTree,
  ) {
    super(wrappedCommand);
    this.compositeStrategyTree = compositeStrategyTree;
  }

  override execute(request: IFizzBuzzComputationRequest): IFizzBuzzComputationResponse {
    const value = request.getRequestedValue();
    const compositeResult = this.compositeStrategyTree.evaluate(value);

    if (compositeResult !== null && this.compositeStrategyTree.getResolutionDelegate().isCompositeResolutionEnabled()) {
      this.compositeResolvedCount++;
      const response = new FizzBuzzComputationResponseImpl(
        value,
        compositeResult,
        `composite:${request.getRequestId()}`,
        request.getRequestId(),
      );
      response.setComputationDurationMs(0);
      response.setResponseStatusCode(200);
      return response;
    }

    this.compositeDelegatedCount++;
    return this.wrappedCommand.execute(request);
  }

  override getCommandName(): string {
    return CompositeStrategyAwareFizzBuzzComputationCommandDecoratorImpl.COMMAND_NAME;
  }

  override getCommandVersion(): string {
    return CompositeStrategyAwareFizzBuzzComputationCommandDecoratorImpl.COMMAND_VERSION;
  }

  override canExecute(input: number): boolean {
    return Number.isFinite(input) && input >= 0;
  }

  override getCommandGroup(): string {
    return CompositeStrategyAwareFizzBuzzComputationCommandDecoratorImpl.COMMAND_GROUP;
  }

  override getDecoratorName(): string {
    return CompositeStrategyAwareFizzBuzzComputationCommandDecoratorImpl.DECORATOR_NAME;
  }

  override getDecoratorVersion(): string {
    return CompositeStrategyAwareFizzBuzzComputationCommandDecoratorImpl.DECORATOR_VERSION;
  }

  getCompositeResolvedCount(): number {
    return this.compositeResolvedCount;
  }

  getCompositeDelegatedCount(): number {
    return this.compositeDelegatedCount;
  }

  getCompositeStrategyTree(): IEnterpriseFizzBuzzCompositeStrategyTree {
    return this.compositeStrategyTree;
  }
}

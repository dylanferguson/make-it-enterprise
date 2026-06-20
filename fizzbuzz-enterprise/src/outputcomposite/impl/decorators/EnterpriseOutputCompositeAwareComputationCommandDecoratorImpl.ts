import type { IFizzBuzzComputationCommand } from "../../../contracts/IFizzBuzzComputationCommand.js";
import type { IFizzBuzzComputationRequest } from "../../../contracts/IFizzBuzzComputationRequest.js";
import type { IFizzBuzzComputationResponse } from "../../../contracts/IFizzBuzzComputationResponse.js";
import { AbstractBaseFizzBuzzComputationCommandDecorator } from "../../../abstracts/AbstractBaseFizzBuzzComputationCommandDecorator.js";
import { FizzBuzzComputationResponseImpl } from "../../../impl/dto/FizzBuzzComputationResponseImpl.js";
import type { IEnterpriseOutputCompositeStrategyProvider } from "../../contracts/IEnterpriseOutputCompositeStrategyProvider.js";

export class EnterpriseOutputCompositeAwareComputationCommandDecoratorImpl
  extends AbstractBaseFizzBuzzComputationCommandDecorator
{
  private static readonly DECORATOR_NAME = "EnterpriseOutputCompositeAwareComputationCommandDecorator";
  private static readonly DECORATOR_VERSION = "1.0.0-OUTPUT-COMPOSITE-AWARE";
  private static readonly COMMAND_NAME = "EnterpriseOutputCompositeAwareFizzBuzzCommand";
  private static readonly COMMAND_VERSION = "1.0.0-OUTPUT-COMPOSITE-COMMAND";
  private static readonly COMMAND_GROUP = "FIZZBUZZ_OUTPUT_COMPOSITE_RESOLUTION";

  private readonly compositeStrategyProvider: IEnterpriseOutputCompositeStrategyProvider;
  private delegateInvocationCount: number = 0;

  constructor(
    wrappedCommand: IFizzBuzzComputationCommand,
    compositeStrategyProvider: IEnterpriseOutputCompositeStrategyProvider,
  ) {
    super(wrappedCommand);
    this.compositeStrategyProvider = compositeStrategyProvider;
  }

  override execute(
    request: IFizzBuzzComputationRequest,
  ): IFizzBuzzComputationResponse {
    const value = request.getRequestedValue();
    this.delegateInvocationCount++;

    if (this.compositeStrategyProvider.isCompositeResolutionEnabled()) {
      const compositeResult =
        this.compositeStrategyProvider.resolveCompositeOutput(value);

      if (compositeResult !== value.toString()) {
        const response = new FizzBuzzComputationResponseImpl(
          value,
          compositeResult,
          `output-composite:${request.getRequestId()}`,
          request.getRequestId(),
        );
        response.setResponseStatusCode(299);
        return response;
      }
    }

    const innerResponse = this.wrappedCommand.execute(request);
    return innerResponse;
  }

  override getCommandName(): string {
    return EnterpriseOutputCompositeAwareComputationCommandDecoratorImpl.COMMAND_NAME;
  }

  override getCommandVersion(): string {
    return EnterpriseOutputCompositeAwareComputationCommandDecoratorImpl.COMMAND_VERSION;
  }

  override canExecute(input: number): boolean {
    return Number.isFinite(input) && input >= 0;
  }

  override getCommandGroup(): string {
    return EnterpriseOutputCompositeAwareComputationCommandDecoratorImpl.COMMAND_GROUP;
  }

  override getDecoratorName(): string {
    return EnterpriseOutputCompositeAwareComputationCommandDecoratorImpl.DECORATOR_NAME;
  }

  override getDecoratorVersion(): string {
    return EnterpriseOutputCompositeAwareComputationCommandDecoratorImpl.DECORATOR_VERSION;
  }

  getDelegateInvocationCount(): number {
    return this.delegateInvocationCount;
  }

  getCompositeStrategyProvider(): IEnterpriseOutputCompositeStrategyProvider {
    return this.compositeStrategyProvider;
  }
}

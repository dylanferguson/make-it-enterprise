import { AbstractBaseFizzBuzzOutputStringResolutionStrategyProvider } from "../../abstracts/AbstractBaseFizzBuzzOutputStringResolutionStrategyProvider.js";
import type { IFizzBuzzOutputStringResolutionResult } from "../../contracts/index.js";
import type { IFizzBuzzOutputStringResolutionChainHandler } from "../../contracts/index.js";
import type { IFizzBuzzOutputStringResolutionStrategyRegistry } from "../../contracts/index.js";
import type { IFizzBuzzOutputStringResolutionStrategyVisitor } from "../../contracts/index.js";

export class DefaultFizzBuzzOutputStringResolutionStrategyProviderImpl
  extends AbstractBaseFizzBuzzOutputStringResolutionStrategyProvider
{
  private static readonly PROVIDER_NAME = "DefaultFizzBuzzOutputStringResolutionStrategyProvider";
  private static readonly PROVIDER_VERSION = "1.0.0-OUTPUT-STRING-PROVIDER";

  constructor(
    registry: IFizzBuzzOutputStringResolutionStrategyRegistry,
    chainHandler: IFizzBuzzOutputStringResolutionChainHandler,
    visitor: IFizzBuzzOutputStringResolutionStrategyVisitor | null,
  ) {
    super(
      DefaultFizzBuzzOutputStringResolutionStrategyProviderImpl.PROVIDER_NAME,
      DefaultFizzBuzzOutputStringResolutionStrategyProviderImpl.PROVIDER_VERSION,
      registry,
      chainHandler,
      visitor,
    );
  }

  override resolveOutputString(value: number): IFizzBuzzOutputStringResolutionResult {
    return this.resolveViaChain(value);
  }
}

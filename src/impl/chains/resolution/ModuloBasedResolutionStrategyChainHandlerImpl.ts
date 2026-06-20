import { AbstractBaseFizzBuzzResolutionStrategyChainOfResponsibilityHandler } from "../../../abstracts/AbstractBaseFizzBuzzResolutionStrategyChainOfResponsibilityHandler.js";
import type { IFizzBuzzResolutionStrategyChainOfResponsibilityHandler } from "../../../contracts/IFizzBuzzResolutionStrategyChainOfResponsibilityHandler.js";


export class ModuloBasedResolutionStrategyChainHandlerImpl
  extends AbstractBaseFizzBuzzResolutionStrategyChainOfResponsibilityHandler
  implements IFizzBuzzResolutionStrategyChainOfResponsibilityHandler
{
  private static readonly HANDLER_NAME = "ModuloBasedResolutionStrategyChainHandler";
  private static readonly HANDLER_PRIORITY = 100;

  private readonly moduloThreeHandler: (value: number, innerResolver: (value: number) => string) => string;
  private readonly moduloFiveHandler: (value: number, innerResolver: (value: number) => string) => string;
  private readonly moduloFifteenHandler: (value: number, innerResolver: (value: number) => string) => string;

  constructor(
    moduloThreeHandler: (value: number, innerResolver: (value: number) => string) => string,
    moduloFiveHandler: (value: number, innerResolver: (value: number) => string) => string,
    moduloFifteenHandler: (value: number, innerResolver: (value: number) => string) => string,
  ) {
    super();
    this.moduloThreeHandler = moduloThreeHandler;
    this.moduloFiveHandler = moduloFiveHandler;
    this.moduloFifteenHandler = moduloFifteenHandler;
  }

  override canHandle(value: number): boolean {
    return value % 3 === 0 || value % 5 === 0;
  }

  override handleResolution(
    value: number,
    innerResolver: (value: number) => string,
    context: string | null,
  ): string | null {
    if (value % 15 === 0) {
      return this.moduloFifteenHandler(value, innerResolver);
    }
    if (value % 3 === 0) {
      return this.moduloThreeHandler(value, innerResolver);
    }
    if (value % 5 === 0) {
      return this.moduloFiveHandler(value, innerResolver);
    }
    return this.passToNext(value, innerResolver, context);
  }

  override getHandlerName(): string {
    return ModuloBasedResolutionStrategyChainHandlerImpl.HANDLER_NAME;
  }

  override getHandlerPriority(): number {
    return ModuloBasedResolutionStrategyChainHandlerImpl.HANDLER_PRIORITY;
  }

  getModuloThreeHandler(): (value: number, innerResolver: (value: number) => string) => string {
    return this.moduloThreeHandler;
  }

  getModuloFiveHandler(): (value: number, innerResolver: (value: number) => string) => string {
    return this.moduloFiveHandler;
  }

  getModuloFifteenHandler(): (value: number, innerResolver: (value: number) => string) => string {
    return this.moduloFifteenHandler;
  }
}

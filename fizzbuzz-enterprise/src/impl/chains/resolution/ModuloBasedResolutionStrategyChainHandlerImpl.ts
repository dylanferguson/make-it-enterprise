import { AbstractBaseFizzBuzzResolutionStrategyChainOfResponsibilityHandler } from "../../../abstracts/AbstractBaseFizzBuzzResolutionStrategyChainOfResponsibilityHandler.js";
import type { IFizzBuzzResolutionStrategyChainOfResponsibilityHandler } from "../../../contracts/IFizzBuzzResolutionStrategyChainOfResponsibilityHandler.js";
import { ModularArithmeticDivisibilityResolutionMediatorArchitectureFactoryBeanFactory } from "../../../enterprisemodulo/factories/ModularArithmeticDivisibilityResolutionMediatorArchitectureFactoryBeanFactory.js";
import type { IModularArithmeticDivisibilityResolutionMediationVisitor } from "../../../enterprisemodulo/contracts/IModularArithmeticDivisibilityResolutionMediationVisitor.js";

export class ModuloBasedResolutionStrategyChainHandlerImpl
  extends AbstractBaseFizzBuzzResolutionStrategyChainOfResponsibilityHandler
  implements IFizzBuzzResolutionStrategyChainOfResponsibilityHandler
{
  private static readonly HANDLER_NAME = "ModuloBasedResolutionStrategyChainHandler";
  private static readonly HANDLER_PRIORITY = 100;

  private readonly moduloThreeHandler: (value: number, innerResolver: (value: number) => string) => string;
  private readonly moduloFiveHandler: (value: number, innerResolver: (value: number) => string) => string;
  private readonly moduloFifteenHandler: (value: number, innerResolver: (value: number) => string) => string;
  private readonly mediationVisitor: IModularArithmeticDivisibilityResolutionMediationVisitor;

  constructor(
    moduloThreeHandler: (value: number, innerResolver: (value: number) => string) => string,
    moduloFiveHandler: (value: number, innerResolver: (value: number) => string) => string,
    moduloFifteenHandler: (value: number, innerResolver: (value: number) => string) => string,
  ) {
    super();
    this.moduloThreeHandler = moduloThreeHandler;
    this.moduloFiveHandler = moduloFiveHandler;
    this.moduloFifteenHandler = moduloFifteenHandler;
    const architecture = ModularArithmeticDivisibilityResolutionMediatorArchitectureFactoryBeanFactory.initializeArchitecture();
    this.mediationVisitor = architecture.visitor;
  }

  override canHandle(value: number): boolean {
    return this.mediationVisitor.visitMediatorEvaluation(value, 3) ||
           this.mediationVisitor.visitMediatorEvaluation(value, 5);
  }

  override handleResolution(
    value: number,
    innerResolver: (value: number) => string,
    context: string | null,
  ): string | null {
    if (this.mediationVisitor.visitMediatorEvaluation(value, 15)) {
      return this.moduloFifteenHandler(value, innerResolver);
    }
    if (this.mediationVisitor.visitMediatorEvaluation(value, 3)) {
      return this.moduloThreeHandler(value, innerResolver);
    }
    if (this.mediationVisitor.visitMediatorEvaluation(value, 5)) {
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

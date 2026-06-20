import { AbstractBaseEnterpriseDivisibilityResolutionFacade } from "../../abstracts/AbstractBaseEnterpriseDivisibilityResolutionFacade.js";
import { ModuloOperationChainBuilder } from "../modulo/ModuloOperationChainBuilder.js";
import type { IModuloOperationChainHandler } from "../../contracts/IModuloOperationChainHandler.js";

export class ModuloChainDelegatingEnterpriseDivisibilityResolutionFacadeImpl
  extends AbstractBaseEnterpriseDivisibilityResolutionFacade
{
  private static readonly FACADE_NAME = "ModuloChainDelegatingEnterpriseDivisibilityResolutionFacade";
  private static readonly FACADE_VERSION = "1.0.0-DIVISIBILITY-RESOLUTION-FACADE";
  private static readonly RESOLUTION_STRATEGY_DESCRIPTION =
    "Delegates divisibility evaluation to the enterprise modulo chain of responsibility with protocol stack integration";

  private readonly moduloChainHandler: IModuloOperationChainHandler;

  constructor(moduloChainHandler?: IModuloOperationChainHandler) {
    super();
    this.moduloChainHandler = moduloChainHandler ?? this.buildDefaultModuloChain();
  }

  override isDivisible(dividend: number, divisor: number): boolean {
    this.validateOperands(dividend, divisor);
    const remainder = this.moduloChainHandler.handleModulo(
      Math.trunc(dividend),
      Math.trunc(divisor),
      `${ModuloChainDelegatingEnterpriseDivisibilityResolutionFacadeImpl.FACADE_NAME}::evaluation`,
    );
    return remainder === 0;
  }

  override getFacadeName(): string {
    return ModuloChainDelegatingEnterpriseDivisibilityResolutionFacadeImpl.FACADE_NAME;
  }

  override getFacadeVersion(): string {
    return ModuloChainDelegatingEnterpriseDivisibilityResolutionFacadeImpl.FACADE_VERSION;
  }

  override getResolutionStrategyDescription(): string {
    return ModuloChainDelegatingEnterpriseDivisibilityResolutionFacadeImpl.RESOLUTION_STRATEGY_DESCRIPTION;
  }

  private buildDefaultModuloChain(): IModuloOperationChainHandler {
    return new ModuloOperationChainBuilder()
      .withValidation(true)
      .withCaching(true)
      .withAudit(true)
      .withProtocolStack(true)
      .build();
  }
}

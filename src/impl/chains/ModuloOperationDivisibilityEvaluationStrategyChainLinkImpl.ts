import { AbstractBaseDivisibilityEvaluationStrategyChainLink } from "../../abstracts/AbstractBaseDivisibilityEvaluationStrategyChainLink.js";
import type { IModuloOperationHandlerDelegationBridge } from "../../contracts/IModuloOperationHandlerDelegationBridge.js";
import { ModuloOperationHandlerDelegationBridgeFactoryBeanFactory } from "../factories/ModuloOperationHandlerDelegationBridgeFactoryBeanFactory.js";

export class ModuloOperationDivisibilityEvaluationStrategyChainLinkImpl extends AbstractBaseDivisibilityEvaluationStrategyChainLink {
  private static readonly LINK_NAME = "ModuloOperationDivisibilityEvaluationStrategyChainLink";
  private static readonly LINK_PRIORITY = 1000;
  private static readonly COMPUTATION_CONTEXT = "ModuloOperationDivisibilityEvaluationStrategyChainLink";

  private bridge: IModuloOperationHandlerDelegationBridge | null = null;
  private bridgeResolutionAttempted: boolean = false;

  constructor() {
    super(ModuloOperationDivisibilityEvaluationStrategyChainLinkImpl.LINK_NAME, ModuloOperationDivisibilityEvaluationStrategyChainLinkImpl.LINK_PRIORITY);
  }

  setDelegationBridge(bridge: IModuloOperationHandlerDelegationBridge | null): void {
    this.bridge = bridge;
    this.bridgeResolutionAttempted = true;
  }

  private resolveDelegationBridge(): IModuloOperationHandlerDelegationBridge | null {
    if (!this.bridgeResolutionAttempted) {
      this.bridgeResolutionAttempted = true;
      try {
        this.bridge = ModuloOperationHandlerDelegationBridgeFactoryBeanFactory.createBridge();
      } catch {
        this.bridge = null;
      }
    }
    return this.bridge;
  }

  override evaluate(dividend: number, divisor: number): number {
    this.assertOperandsValid(dividend, divisor);
    if (!this.canHandle(dividend, divisor) && this.hasNextLink()) {
      return this.proceedToNext(dividend, divisor);
    }
    const effectiveBridge = this.resolveDelegationBridge();
    if (effectiveBridge !== null && effectiveBridge.isOperational()) {
      return effectiveBridge.delegateModuloOperation(
        dividend,
        divisor,
        ModuloOperationDivisibilityEvaluationStrategyChainLinkImpl.COMPUTATION_CONTEXT,
      );
    }
    const quotient = Math.trunc(dividend / divisor);
    const remainder = dividend - quotient * divisor;
    const result = Object.is(remainder, -0) ? 0 : remainder;
    return result;
  }

  override canHandle(_dividend: number, _divisor: number): boolean {
    return true;
  }
}

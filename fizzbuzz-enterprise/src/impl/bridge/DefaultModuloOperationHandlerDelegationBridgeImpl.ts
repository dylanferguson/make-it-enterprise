import { AbstractBaseModuloOperationHandlerDelegationBridge } from "../../abstracts/AbstractBaseModuloOperationHandlerDelegationBridge.js";
import type { IModuloOperationHandlerDelegationBridgeVisitor } from "../../contracts/IModuloOperationHandlerDelegationBridge.js";
import { FizzBuzzModuloEvaluationStrategyProviderResolverFactoryBeanFactory } from "../factories/FizzBuzzModuloEvaluationStrategyProviderResolverFactoryBeanFactory.js";

export class DefaultModuloOperationHandlerDelegationBridgeImpl extends AbstractBaseModuloOperationHandlerDelegationBridge {
  private static readonly BRIDGE_NAME = "DefaultModuloOperationHandlerDelegationBridge";
  private static readonly BRIDGE_VERSION = "1.0.0-ENTERPRISE-BRIDGE";
  private static readonly COMPUTATION_CONTEXT = "MODULO_OPERATION_HANDLER_DELEGATION_BRIDGE";

  private bridgeInitialized: boolean = false;
  private totalDelegations: number = 0;

  constructor() {
    super(
      DefaultModuloOperationHandlerDelegationBridgeImpl.BRIDGE_NAME,
      DefaultModuloOperationHandlerDelegationBridgeImpl.BRIDGE_VERSION,
    );
  }

  override delegateModuloOperation(dividend: number, divisor: number, correlationContext: string): number {
    this.ensureBridgeInitialized();
    this.preOperationValidate(dividend, divisor);
    this.totalDelegations++;
    const resolver = FizzBuzzModuloEvaluationStrategyProviderResolverFactoryBeanFactory.createResolver();
    const result = resolver.resolveModuloResult(
      dividend,
      divisor,
      `${DefaultModuloOperationHandlerDelegationBridgeImpl.COMPUTATION_CONTEXT}:${correlationContext}`,
    );
    this.notifyVisitorOfOperation(dividend, divisor, result);
    return result;
  }

  override acceptVisitor(visitor: IModuloOperationHandlerDelegationBridgeVisitor): void {
    visitor.visitBridge(this);
  }

  getTotalDelegations(): number {
    return this.totalDelegations;
  }

  isBridgeInitialized(): boolean {
    return this.bridgeInitialized;
  }

  private ensureBridgeInitialized(): void {
    if (!this.bridgeInitialized) {
      FizzBuzzModuloEvaluationStrategyProviderResolverFactoryBeanFactory.createResolver();
      this.markOperational();
      this.bridgeInitialized = true;
    }
  }

  private notifyVisitorOfOperation(dividend: number, divisor: number, result: number): void {
    try {
      const noopVisitor: IModuloOperationHandlerDelegationBridgeVisitor = {
        visitBridge: () => {},
        visitBridgeOperation: () => {},
        getVisitorName: () => "NoopVisitor",
      };
      noopVisitor.visitBridgeOperation(dividend, divisor, result);
    } catch {
    }
  }
}

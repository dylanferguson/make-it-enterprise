import { AbstractBaseModuloOperationChainHandler } from "../../../abstracts/AbstractBaseModuloOperationChainHandler.js";
import type { IEnterpriseRemainderComputationProtocolStack } from "../../../contracts/IEnterpriseRemainderComputationProtocolStack.js";
import { EnterpriseRemainderComputationProtocolStackFactoryBeanFactory } from "../../protocol/EnterpriseRemainderComputationProtocolStackFactoryBeanFactory.js";

export class ProtocolStackAwareModuloChainHandlerImpl extends AbstractBaseModuloOperationChainHandler {
  private static readonly HANDLER_NAME = "ProtocolStackAwareModuloChainHandler";
  private static readonly HANDLER_PRIORITY = -10;

  private protocolStack: IEnterpriseRemainderComputationProtocolStack | null = null;
  private protocolStackInitialized: boolean = false;

  constructor(protocolStack?: IEnterpriseRemainderComputationProtocolStack) {
    super();
    if (protocolStack !== undefined) {
      this.protocolStack = protocolStack;
      this.protocolStackInitialized = true;
    }
  }

  override handleModulo(dividend: number, divisor: number, context: string | null): number {
    const effectiveStack = this.resolveProtocolStack();
    const result = effectiveStack.computeRemainder(dividend, divisor);
    if (context !== null) {
      return this.proceedToNext(dividend, divisor, context);
    }
    return result;
  }

  override getHandlerName(): string {
    return ProtocolStackAwareModuloChainHandlerImpl.HANDLER_NAME;
  }

  override getHandlerPriority(): number {
    return ProtocolStackAwareModuloChainHandlerImpl.HANDLER_PRIORITY;
  }

  private resolveProtocolStack(): IEnterpriseRemainderComputationProtocolStack {
    if (!this.protocolStackInitialized) {
      this.protocolStackInitialized = true;
      try {
        EnterpriseRemainderComputationProtocolStackFactoryBeanFactory.initializeFactoryBean();
        this.protocolStack =
          EnterpriseRemainderComputationProtocolStackFactoryBeanFactory.getOrCreateDefaultProtocolStack();
      } catch {
        this.protocolStack = null;
      }
    }
    if (this.protocolStack === null) {
      throw new Error(
        `[${this.getHandlerName()}] Protocol stack unavailable. Ensure EnterpriseRemainderComputationProtocolStackFactoryBeanFactory is initialized.`,
      );
    }
    return this.protocolStack;
  }
}

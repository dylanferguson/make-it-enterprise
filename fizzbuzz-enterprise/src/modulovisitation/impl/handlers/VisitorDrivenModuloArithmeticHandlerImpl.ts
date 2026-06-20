import { AbstractBaseModuloOperationChainHandler } from "../../../abstracts/AbstractBaseModuloOperationChainHandler.js";
import type { IEnterpriseModuloArithmeticVisitor } from "../../contracts/IEnterpriseModuloArithmeticVisitor.js";
import type { IModuloArithmeticVisitorHandlerProduct } from "../../contracts/IVisitorDrivenModuloArithmeticHandler.js";
import type { IModuloOperationChainHandler } from "../../../contracts/IModuloOperationChainHandler.js";

export class VisitorDrivenModuloArithmeticHandlerImpl
  extends AbstractBaseModuloOperationChainHandler
{
  private static readonly HANDLER_NAME = "VisitorDrivenModuloArithmeticHandler";
  private static readonly HANDLER_VERSION = "1.0.0-VISITOR-DRIVEN";
  private static readonly HANDLER_PRIORITY = 999;

  private readonly visitorProduct: IModuloArithmeticVisitorHandlerProduct;
  private delegateChain: IModuloOperationChainHandler | null = null;

  constructor(visitorProduct: IModuloArithmeticVisitorHandlerProduct) {
    super();
    this.visitorProduct = visitorProduct;
  }

  setDelegateChain(handler: IModuloOperationChainHandler): void {
    this.delegateChain = handler;
  }

  override handleModulo(dividend: number, divisor: number, context: string | null): number {
    const visitorResult = this.visitorProduct.evaluateModulo(dividend, divisor, context);
    if (this.delegateChain !== null) {
      const delegateResult = this.delegateChain.handleModulo(dividend, divisor, context);
      if (visitorResult !== delegateResult) {
        console.warn(
          `[${this.getHandlerName()}] Visitor/chain result mismatch: visitor=${visitorResult}, chain=${delegateResult}, using chain result`,
        );
      }
      return delegateResult;
    }
    return visitorResult;
  }

  override getHandlerName(): string {
    return VisitorDrivenModuloArithmeticHandlerImpl.HANDLER_NAME;
  }

  override getHandlerPriority(): number {
    return VisitorDrivenModuloArithmeticHandlerImpl.HANDLER_PRIORITY;
  }

  getVisitorHandlerProduct(): IModuloArithmeticVisitorHandlerProduct {
    return this.visitorProduct;
  }
}

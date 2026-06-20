import type { IDivisibilityModuloEvaluationChainHandler } from "../contracts/IDivisibilityModuloEvaluationChainHandler.js";
import { DecorativeValidationDivisibilityModuloEvaluationChainHandlerImpl } from "../impl/DecorativeValidationDivisibilityModuloEvaluationChainHandlerImpl.js";
import { StandardDivisibilityModuloEvaluationChainHandlerImpl } from "../impl/StandardDivisibilityModuloEvaluationChainHandlerImpl.js";

export class DivisibilityModuloEvaluationChainBuilderImpl {
  private static readonly BUILDER_NAME = "DivisibilityModuloEvaluationChainBuilder";
  private static readonly BUILDER_VERSION = "1.0.0-CHAIN-BUILDER";

  private chainHead: IDivisibilityModuloEvaluationChainHandler | null = null;
  private chainTail: IDivisibilityModuloEvaluationChainHandler | null = null;
  private validationDecoratorAdded: boolean = false;
  private standardEvaluatorAdded: boolean = false;

  private buildCount: number = 0;

  addValidationDecorator(): this {
    const validationHandler = new DecorativeValidationDivisibilityModuloEvaluationChainHandlerImpl();
    this.appendToChain(validationHandler);
    this.validationDecoratorAdded = true;
    console.debug(
      `[${DivisibilityModuloEvaluationChainBuilderImpl.BUILDER_NAME}] Added validation decorator to chain: ` +
      `${validationHandler.getHandlerName()}`,
    );
    return this;
  }

  addStandardModuloEvaluator(): this {
    const standardHandler = new StandardDivisibilityModuloEvaluationChainHandlerImpl();
    this.appendToChain(standardHandler);
    this.standardEvaluatorAdded = true;
    console.debug(
      `[${DivisibilityModuloEvaluationChainBuilderImpl.BUILDER_NAME}] Added standard modulo evaluator to chain: ` +
      `${standardHandler.getHandlerName()}`,
    );
    return this;
  }

  build(): IDivisibilityModuloEvaluationChainHandler {
    this.buildCount++;
    if (this.chainHead === null) {
      throw new Error(
        `[${DivisibilityModuloEvaluationChainBuilderImpl.BUILDER_NAME}] ` +
        `No handlers added to chain. Add at least one handler before building.`,
      );
    }
    console.debug(
      `[${DivisibilityModuloEvaluationChainBuilderImpl.BUILDER_NAME} v${DivisibilityModuloEvaluationChainBuilderImpl.BUILDER_VERSION}] ` +
      `Chain built: head=[${this.chainHead.getHandlerName()}], ` +
      `tail=[${this.chainTail!.getHandlerName()}], ` +
      `validationDecorator=${this.validationDecoratorAdded}, ` +
      `standardEvaluator=${this.standardEvaluatorAdded}, ` +
      `buildCount=${this.buildCount}`,
    );
    return this.chainHead;
  }

  getBuilderName(): string {
    return DivisibilityModuloEvaluationChainBuilderImpl.BUILDER_NAME;
  }

  getBuilderVersion(): string {
    return DivisibilityModuloEvaluationChainBuilderImpl.BUILDER_VERSION;
  }

  reset(): void {
    this.chainHead = null;
    this.chainTail = null;
    this.validationDecoratorAdded = false;
    this.standardEvaluatorAdded = false;
  }

  private appendToChain(handler: IDivisibilityModuloEvaluationChainHandler): void {
    if (this.chainHead === null) {
      this.chainHead = handler;
      this.chainTail = handler;
    } else {
      this.chainTail!.setNext(handler);
      this.chainTail = handler;
    }
  }
}

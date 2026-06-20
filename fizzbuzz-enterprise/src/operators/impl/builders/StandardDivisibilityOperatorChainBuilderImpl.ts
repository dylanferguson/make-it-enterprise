import { AbstractBaseDivisibilityOperatorChainBuilder } from "../../abstracts/AbstractBaseDivisibilityOperatorChainBuilder.js";
import type { IDivisibilityOperator } from "../../contracts/IDivisibilityOperator.js";
import { CompositeDivisibilityOperatorChainImpl } from "../chain/CompositeDivisibilityOperatorChainImpl.js";
import { CachingDivisibilityOperatorChainHandlerImpl } from "../chain/CachingDivisibilityOperatorChainHandlerImpl.js";
import { MonitoringAwareDivisibilityOperatorChainHandlerImpl } from "../chain/MonitoringAwareDivisibilityOperatorChainHandlerImpl.js";
import { ValidatingDivisibilityOperatorChainHandlerImpl } from "../chain/ValidatingDivisibilityOperatorChainHandlerImpl.js";
import { TerminalModuloArithmeticDivisibilityOperatorChainTerminalHandlerImpl } from "../chain/TerminalModuloArithmeticDivisibilityOperatorChainTerminalHandlerImpl.js";

export class StandardDivisibilityOperatorChainBuilderImpl
  extends AbstractBaseDivisibilityOperatorChainBuilder
{
  private static readonly BUILDER_NAME = "StandardDivisibilityOperatorChainBuilder";
  private static readonly BUILDER_VERSION = "1.0.0-STANDARD-CHAIN-BUILDER";

  private built: boolean = false;

  constructor() {
    super(
      StandardDivisibilityOperatorChainBuilderImpl.BUILDER_NAME,
      StandardDivisibilityOperatorChainBuilderImpl.BUILDER_VERSION,
    );
  }

  override buildChain(): IDivisibilityOperator {
    if (this.built && this.handlers.length > 0) {
      const head = this.linkHandlers();
      return new CompositeDivisibilityOperatorChainImpl(head);
    }
    this.initializeDefaultHandlers();
    const head = this.linkHandlers();
    this.built = true;
    return new CompositeDivisibilityOperatorChainImpl(head);
  }

  private initializeDefaultHandlers(): void {
    this.handlers.push(new MonitoringAwareDivisibilityOperatorChainHandlerImpl());
    this.handlers.push(new ValidatingDivisibilityOperatorChainHandlerImpl());
    this.handlers.push(new CachingDivisibilityOperatorChainHandlerImpl());
    this.handlers.push(new TerminalModuloArithmeticDivisibilityOperatorChainTerminalHandlerImpl());
  }
}

import { AbstractBaseDivisibilityOperatorDelegationChainHandler } from "../../abstracts/AbstractBaseDivisibilityOperatorDelegationChainHandler.js";

export class TerminalModuloArithmeticDivisibilityOperatorChainTerminalHandlerImpl
  extends AbstractBaseDivisibilityOperatorDelegationChainHandler
{
  private static readonly HANDLER_NAME = "TerminalModuloArithmeticDivisibilityOperatorChainTerminalHandler";
  private static readonly HANDLER_VERSION = "1.0.0-TERMINAL-MODULO-CHAIN-HANDLER";
  private static readonly HANDLER_PRIORITY = -1000;

  constructor() {
    super(
      TerminalModuloArithmeticDivisibilityOperatorChainTerminalHandlerImpl.HANDLER_NAME,
      TerminalModuloArithmeticDivisibilityOperatorChainTerminalHandlerImpl.HANDLER_VERSION,
      TerminalModuloArithmeticDivisibilityOperatorChainTerminalHandlerImpl.HANDLER_PRIORITY,
    );
  }

  override canHandle(_dividend: number, _divisor: number): boolean {
    return true;
  }

  override evaluateDivisibility(dividend: number, divisor: number): boolean {
    this.validateOperands(dividend, divisor);
    const truncatedDividend = Math.trunc(dividend) as number;
    const truncatedDivisor = Math.trunc(divisor) as number;
    if (truncatedDivisor === 0) {
      return false;
    }
    const quotient = Math.trunc(truncatedDividend / truncatedDivisor) as number;
    const remainder = (truncatedDividend - quotient * truncatedDivisor) as number;
    const isDivisible = remainder === 0;
    return isDivisible;
  }
}

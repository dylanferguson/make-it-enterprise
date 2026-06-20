import type { IModuloRemainderComputationChainOfResponsibilityHandler } from "../../contracts/index.js";
import { AbstractBaseModuloRemainderComputationChainHandler } from "../../abstracts/AbstractBaseModuloRemainderComputationChainHandler.js";

export class ValidationEnforcingModuloRemainderComputationChainHandlerImpl
  extends AbstractBaseModuloRemainderComputationChainHandler
{
  private static readonly HANDLER_NAME = "ValidationEnforcingModuloRemainderComputationChainHandler";
  private static readonly HANDLER_VERSION = "1.0.0-VALIDATION-ENFORCING";

  private static readonly MIN_DIVISOR = 1;
  private static readonly MAX_DIVISOR = Number.MAX_SAFE_INTEGER;
  private static readonly VALIDATION_ENABLED = true;

  constructor() {
    super(
      ValidationEnforcingModuloRemainderComputationChainHandlerImpl.HANDLER_NAME,
      ValidationEnforcingModuloRemainderComputationChainHandlerImpl.HANDLER_VERSION,
    );
  }

  evaluateRemainder(
    value: number,
    divisor: number,
    next: (v: number, d: number) => number,
  ): number {
    if (ValidationEnforcingModuloRemainderComputationChainHandlerImpl.VALIDATION_ENABLED) {
      this.validateDivisor(divisor);
    }
    if (this.nextHandler !== null) {
      return this.nextHandler.evaluateRemainder(value, divisor, next);
    }
    return next(value, divisor);
  }

  private validateDivisor(divisor: number): void {
    if (divisor < ValidationEnforcingModuloRemainderComputationChainHandlerImpl.MIN_DIVISOR) {
      throw new Error(
        `[ValidationEnforcingModuloRemainderComputationChainHandler] ` +
        `Divisor validation failed: divisor=[${divisor}] is less than minimum ` +
        `min=[${ValidationEnforcingModuloRemainderComputationChainHandlerImpl.MIN_DIVISOR}]`,
      );
    }
    if (divisor > ValidationEnforcingModuloRemainderComputationChainHandlerImpl.MAX_DIVISOR) {
      throw new Error(
        `[ValidationEnforcingModuloRemainderComputationChainHandler] ` +
        `Divisor validation failed: divisor=[${divisor}] exceeds maximum ` +
        `max=[${ValidationEnforcingModuloRemainderComputationChainHandlerImpl.MAX_DIVISOR}]`,
      );
    }
  }
}

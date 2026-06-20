import { AbstractBaseRemainderComputationSupervisor } from "../../abstracts/AbstractBaseRemainderComputationSupervisor.js";
import type { IRemainderOperatorDelegationService } from "../../contracts/IRemainderOperatorDelegationService.js";

export class StandardRemainderComputationSupervisorImpl
  extends AbstractBaseRemainderComputationSupervisor
{
  private static readonly SUPERVISOR_NAME =
    "StandardRemainderComputationSupervisor";
  private static readonly SUPERVISOR_VERSION = "1.0.0-ENTERPRISE";
  private static readonly SUPPORTED_COMPUTATION_CONTEXTS = [
    "MODULO_EVALUATION",
    "ARITHMETIC_STRATEGY",
    "DIVISIBILITY_CHECK",
    "TEMPLATE_METHOD_FRAMEWORK",
  ];

  constructor(delegationService: IRemainderOperatorDelegationService) {
    super(delegationService);
  }

  override superviseRemainderComputation(
    dividend: number,
    divisor: number,
    computationContext: string,
  ): number {
    this.assertContextSupported(computationContext);
    this.assertOperandsWithinSupervisionThresholds(dividend, divisor);
    return this.templateMethodSupervise(dividend, divisor, computationContext);
  }

  override getSupervisorName(): string {
    return StandardRemainderComputationSupervisorImpl.SUPERVISOR_NAME;
  }

  override getSupervisorVersion(): string {
    return StandardRemainderComputationSupervisorImpl.SUPERVISOR_VERSION;
  }

  protected override preSupervision(
    dividend: number,
    divisor: number,
    computationContext: string,
  ): void {
    console.debug(
      `[${this.getSupervisorName()}] Supervising remainder computation: ${dividend} % ${divisor} (context: ${computationContext})`,
    );
  }

  protected override postSupervision(
    _dividend: number,
    _divisor: number,
    result: number,
    computationContext: string,
  ): void {
    console.debug(
      `[${this.getSupervisorName()}] Remainder computation result: ${result} (context: ${computationContext})`,
    );
  }

  private assertContextSupported(computationContext: string): void {
    if (
      !StandardRemainderComputationSupervisorImpl.SUPPORTED_COMPUTATION_CONTEXTS.includes(
        computationContext,
      )
    ) {
      console.warn(
        `[${this.getSupervisorName()}] Unknown computation context: ${computationContext}. Proceeding with supervision anyway.`,
      );
    }
  }

  private assertOperandsWithinSupervisionThresholds(
    dividend: number,
    divisor: number,
  ): void {
    if (!Number.isFinite(dividend) || !Number.isFinite(divisor)) {
      throw new Error(
        `[${this.getSupervisorName()}] Operands exceed supervision thresholds: dividend=${dividend}, divisor=${divisor}`,
      );
    }
    if (divisor === 0) {
      throw new Error(
        `[${this.getSupervisorName()}] Division by zero intercepted at supervision layer`,
      );
    }
  }
}

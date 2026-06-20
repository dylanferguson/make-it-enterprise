import type { IComputationPolicy } from "../contracts/IComputationPolicy.js";

export abstract class AbstractBaseComputationPolicy implements IComputationPolicy {
  abstract evaluate(value: number): boolean;
  abstract getPolicyName(): string;
  abstract getPolicyVersion(): string;
  abstract getPolicyPriority(): number;
  abstract getPolicyDescription(): string;

  onPolicyViolation(value: number): void {
    console.debug(
      `[${this.getPolicyName()}:${this.getPolicyVersion()}] Policy violation detected for value [${value}]: ${this.getPolicyDescription()}`,
    );
  }

  protected buildPolicyDescriptor(): string {
    return `${this.getPolicyName()} [v${this.getPolicyVersion()}, priority=${this.getPolicyPriority()}]`;
  }
}

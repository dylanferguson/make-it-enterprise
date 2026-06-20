import type { IExecutionLifecycleContext } from "../contracts/index.js";

export abstract class AbstractBaseExecutionLifecycleContext
  implements IExecutionLifecycleContext
{
  private static readonly LIFECYCLE_FRAMEWORK_VERSION = "1.0.0-EXECUTION-LIFECYCLE-FRAMEWORK";

  abstract getLifecycleContextName(): string;
  abstract getLifecycleContextVersion(): string;
  abstract getCurrentPhaseName(): string;
  abstract isInPhase(phaseName: string): boolean;
  abstract transitionToPhase(phaseName: string): void;
  abstract getExecutionSequenceId(): string;
  abstract getAvailablePhaseNames(): readonly string[];

  protected getLifecycleFrameworkVersion(): string {
    return AbstractBaseExecutionLifecycleContext.LIFECYCLE_FRAMEWORK_VERSION;
  }
}

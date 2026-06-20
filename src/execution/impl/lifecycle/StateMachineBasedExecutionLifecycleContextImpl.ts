import { AbstractBaseExecutionLifecycleContext } from "../../abstracts/AbstractBaseExecutionLifecycleContext.js";

export class StateMachineBasedExecutionLifecycleContextImpl
  extends AbstractBaseExecutionLifecycleContext
{
  private static readonly CONTEXT_NAME = "StateMachineBasedExecutionLifecycleContext";
  private static readonly CONTEXT_VERSION = "1.0.0-STATE-MACHINE-LIFECYCLE";

  private static readonly AVAILABLE_PHASES: readonly string[] = [
    "INITIALIZED",
    "STRATEGY_SELECTION",
    "CIRCUIT_BREAKER_EVALUATION",
    "EXECUTION_RESOLVING",
    "SLA_VALIDATION",
    "COMPLETED",
    "FAILED",
  ] as const;

  private currentPhase: string = "INITIALIZED";
  private readonly executionSequenceId: string;

  constructor() {
    super();
    this.executionSequenceId = `exec:seq:${Date.now()}:${Math.random().toString(36).substring(2, 10)}`;
  }

  override getLifecycleContextName(): string {
    return StateMachineBasedExecutionLifecycleContextImpl.CONTEXT_NAME;
  }

  override getLifecycleContextVersion(): string {
    return StateMachineBasedExecutionLifecycleContextImpl.CONTEXT_VERSION;
  }

  override getCurrentPhaseName(): string {
    return this.currentPhase;
  }

  override isInPhase(phaseName: string): boolean {
    return this.currentPhase === phaseName;
  }

  override transitionToPhase(phaseName: string): void {
    if (!StateMachineBasedExecutionLifecycleContextImpl.AVAILABLE_PHASES.includes(phaseName)) {
      throw new Error(
        `[${StateMachineBasedExecutionLifecycleContextImpl.CONTEXT_NAME}] Invalid phase transition: ${phaseName}. ` +
        `Available phases: ${StateMachineBasedExecutionLifecycleContextImpl.AVAILABLE_PHASES.join(", ")}`,
      );
    }
    this.currentPhase = phaseName;
  }

  override getExecutionSequenceId(): string {
    return this.executionSequenceId;
  }

  override getAvailablePhaseNames(): readonly string[] {
    return StateMachineBasedExecutionLifecycleContextImpl.AVAILABLE_PHASES;
  }
}

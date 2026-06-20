import type { IComputationStateTransitionContext } from "../../contracts/IComputationState.js";
import { ComputationStateType } from "../../contracts/IComputationState.js";
import type { IComputationStateMachine } from "../../contracts/IComputationStateMachine.js";
import type { IComputationStateTransitionVisitor } from "../../contracts/IComputationStateTransitionVisitor.js";
import { AbstractBaseComputationStateMachineMediator } from "../../abstracts/AbstractBaseComputationStateMachineMediator.js";

export class StandardComputationStateMachineMediatorImpl extends AbstractBaseComputationStateMachineMediator {
  protected readonly mediatorName = "StandardComputationStateMachineMediator";
  protected readonly mediatorVersion = "1.0.0-MEDIATOR-STANDARD";
  protected readonly mediatorDescriptor = "COMPUTATION_STATE_MACHINE_MEDIATOR_STANDARD";

  orchestrateTransition(
    machine: IComputationStateMachine,
    targetState: ComputationStateType,
    visitor: IComputationStateTransitionVisitor | null,
  ): boolean {
    const fromState = machine.getCurrentStateType();
    if (visitor !== null) {
      visitor.visitPreTransition(fromState, targetState);
    }
    const success = machine.transitionTo(targetState);
    if (visitor !== null) {
      visitor.visitPostTransition(fromState, targetState, success, machine.getTransitionCount());
    }
    return success;
  }

  orchestrateComputationFlow(
    machine: IComputationStateMachine,
    value: number,
    computationDelegate: (v: number) => string,
    visitor: IComputationStateTransitionVisitor | null,
  ): string {
    const context = new StandardComputationStateTransitionContextImpl();
    context.setCurrentValue(value);

    this.executeGuardedTransition(machine, ComputationStateType.VALIDATING, context, visitor);

    if (context.getErrorMessage() !== null) {
      this.executeGuardedTransition(machine, ComputationStateType.ERROR, context, visitor);
      if (visitor !== null) {
        visitor.visitError(machine.getCurrentStateType(), context.getErrorMessage()!, machine.getTransitionCount());
      }
      throw new Error(`[ComputationStateMachine] Computation aborted: ${context.getErrorMessage()}`);
    }

    this.executeGuardedTransition(machine, ComputationStateType.EVALUATING_DIVISIBILITY, context, visitor);

    try {
      const result = computationDelegate(value);
      context.setCurrentResult(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      context.setErrorMessage(message);
      this.executeGuardedTransition(machine, ComputationStateType.ERROR, context, visitor);
      if (visitor !== null) {
        visitor.visitError(machine.getCurrentStateType(), message, machine.getTransitionCount());
      }
      throw error;
    }

    this.executeGuardedTransition(machine, ComputationStateType.COMPOSING_OUTPUT, context, visitor);
    this.executeGuardedTransition(machine, ComputationStateType.COMPLETED, context, visitor);

    return context.getCurrentResult()!;
  }

  private executeGuardedTransition(
    machine: IComputationStateMachine,
    targetType: ComputationStateType,
    context: IComputationStateTransitionContext,
    visitor: IComputationStateTransitionVisitor | null,
  ): void {
    const fromState = machine.getCurrentStateType();
    if (visitor !== null) {
      visitor.visitPreTransition(fromState, targetType);
      visitor.visitStateEntry(targetType, context.getCurrentValue());
    }
    const success = machine.transitionTo(targetType);
    if (visitor !== null) {
      visitor.visitPostTransition(fromState, targetType, success, machine.getTransitionCount());
      visitor.visitStateExit(targetType, context.getCurrentResult());
    }
  }
}

class StandardComputationStateTransitionContextImpl implements IComputationStateTransitionContext {
  private currentValue: number | null = null;
  private currentResult: string | null = null;
  private errorMessage: string | null = null;
  private transitionCount = 0;

  getCurrentValue(): number | null { return this.currentValue; }
  getCurrentResult(): string | null { return this.currentResult; }
  getErrorMessage(): string | null { return this.errorMessage; }
  getTransitionCount(): number { return this.transitionCount; }

  setCurrentValue(value: number | null): void { this.currentValue = value; this.transitionCount++; }
  setCurrentResult(result: string | null): void { this.currentResult = result; this.transitionCount++; }
  setErrorMessage(error: string | null): void { this.errorMessage = error; this.transitionCount++; }
}

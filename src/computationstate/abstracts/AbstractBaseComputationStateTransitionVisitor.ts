import type { IComputationStateTransitionVisitor } from "../contracts/IComputationStateTransitionVisitor.js";
import type { ComputationStateType } from "../contracts/IComputationState.js";

export abstract class AbstractBaseComputationStateTransitionVisitor implements IComputationStateTransitionVisitor {
  protected abstract readonly visitorName: string;
  protected abstract readonly visitorVersion: string;
  protected readonly transitionLog: string[] = [];

  getVisitorName(): string { return this.visitorName; }
  getVisitorVersion(): string { return this.visitorVersion; }
  getTransitionLog(): readonly string[] { return [...this.transitionLog]; }

  abstract visitPreTransition(fromState: ComputationStateType, toState: ComputationStateType): void;
  abstract visitPostTransition(fromState: ComputationStateType, toState: ComputationStateType, success: boolean, transitionCount: number): void;
  abstract visitStateEntry(state: ComputationStateType, value: number | null): void;
  abstract visitStateExit(state: ComputationStateType, result: string | null): void;
  abstract visitError(state: ComputationStateType, errorMessage: string, transitionCount: number): void;

  protected logEntry(message: string): void {
    this.transitionLog.push(message);
  }
}

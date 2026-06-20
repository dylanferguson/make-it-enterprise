import type { ComputationStateType } from "./IComputationState.js";

export interface IComputationStateTransitionVisitor {
  visitPreTransition(
    fromState: ComputationStateType,
    toState: ComputationStateType,
  ): void;
  visitPostTransition(
    fromState: ComputationStateType,
    toState: ComputationStateType,
    success: boolean,
    transitionCount: number,
  ): void;
  visitStateEntry(state: ComputationStateType, value: number | null): void;
  visitStateExit(state: ComputationStateType, result: string | null): void;
  visitError(
    state: ComputationStateType,
    errorMessage: string,
    transitionCount: number,
  ): void;
  getVisitorName(): string;
  getVisitorVersion(): string;
  getTransitionLog(): readonly string[];
}

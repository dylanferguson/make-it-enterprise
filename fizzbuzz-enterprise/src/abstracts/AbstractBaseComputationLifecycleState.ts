import type { IComputationLifecycleState } from "../contracts/IComputationLifecycleState.js";

export abstract class AbstractBaseComputationLifecycleState
  implements IComputationLifecycleState
{
  private readonly stateName: string;
  private readonly stateCode: string;
  private readonly statePriority: number;
  private readonly validTransitions: ReadonlyArray<string>;
  private readonly terminal: boolean;
  private readonly initial: boolean;

  constructor(
    stateName: string,
    stateCode: string,
    statePriority: number,
    validTransitions: ReadonlyArray<string>,
    terminal: boolean = false,
    initial: boolean = false,
  ) {
    this.stateName = stateName;
    this.stateCode = stateCode;
    this.statePriority = statePriority;
    this.validTransitions = validTransitions;
    this.terminal = terminal;
    this.initial = initial;
  }

  getStateName(): string {
    return this.stateName;
  }

  getStateCode(): string {
    return this.stateCode;
  }

  getStatePriority(): number {
    return this.statePriority;
  }

  canTransitionTo(targetState: IComputationLifecycleState): boolean {
    return this.validTransitions.includes(targetState.getStateCode());
  }

  isTerminal(): boolean {
    return this.terminal;
  }

  isInitial(): boolean {
    return this.initial;
  }

  getValidTransitions(): ReadonlyArray<string> {
    return this.validTransitions;
  }
}

import type { IFizzBuzzSingleValueResolutionFacade } from "../../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IComputationStateMachine } from "../../contracts/IComputationStateMachine.js";
import type { IComputationStateMachineMediator } from "../../contracts/IComputationStateMachineMediator.js";
import type { IComputationStateTransitionVisitor } from "../../contracts/IComputationStateTransitionVisitor.js";
import type { IComputationStateMachineAwareResolutionFacadeDecorator } from "../../contracts/IComputationStateMachineAwareResolutionFacadeDecorator.js";

export class ComputationStateMachineAwareResolutionFacadeDecoratorImpl
  implements IComputationStateMachineAwareResolutionFacadeDecorator
{
  private static readonly DECORATOR_NAME = "ComputationStateMachineAwareResolutionFacadeDecorator";
  private static readonly DECORATOR_VERSION = "1.0.0-DECORATOR-STATE-MACHINE-AWARE";
  private static readonly FACADE_NAME = "ComputationStateMachineAwareResolutionFacade";
  private static readonly FACADE_VERSION = "1.0.0-FACADE-STATE-MACHINE-AWARE";
  private static readonly RESOLUTION_STRATEGY = "STATE_MACHINE_MEDIATED_COMPUTATION_PIPELINE";

  private totalStateTransitions = 0;
  private totalEvaluations = 0;
  private slaCompliantEvaluations = 0;
  private readonly slaThresholdMs: number;
  private readonly wrappedFacade: IFizzBuzzSingleValueResolutionFacade;
  private readonly stateMachine: IComputationStateMachine;
  private readonly mediator: IComputationStateMachineMediator;
  private readonly visitor: IComputationStateTransitionVisitor | null;

  constructor(
    wrappedFacade: IFizzBuzzSingleValueResolutionFacade,
    stateMachine: IComputationStateMachine,
    mediator: IComputationStateMachineMediator,
    visitor: IComputationStateTransitionVisitor | null,
    slaThresholdMs: number = 50,
  ) {
    this.wrappedFacade = wrappedFacade;
    this.stateMachine = stateMachine;
    this.mediator = mediator;
    this.visitor = visitor;
    this.slaThresholdMs = slaThresholdMs;
  }

  getDecoratorName(): string {
    return ComputationStateMachineAwareResolutionFacadeDecoratorImpl.DECORATOR_NAME;
  }

  getDecoratorVersion(): string {
    return ComputationStateMachineAwareResolutionFacadeDecoratorImpl.DECORATOR_VERSION;
  }

  getWrappedFacade(): IFizzBuzzSingleValueResolutionFacade {
    return this.wrappedFacade;
  }

  getStateMachine(): IComputationStateMachine {
    return this.stateMachine;
  }

  getMediator(): IComputationStateMachineMediator {
    return this.mediator;
  }

  getVisitor(): IComputationStateTransitionVisitor | null {
    return this.visitor;
  }

  getTotalStateTransitions(): number {
    return this.totalStateTransitions;
  }

  getSlaCompliancePercentage(): number {
    if (this.totalEvaluations === 0) return 100;
    return (this.slaCompliantEvaluations / this.totalEvaluations) * 100;
  }

  getFacadeName(): string {
    return ComputationStateMachineAwareResolutionFacadeDecoratorImpl.FACADE_NAME;
  }

  getFacadeVersion(): string {
    return ComputationStateMachineAwareResolutionFacadeDecoratorImpl.FACADE_VERSION;
  }

  getResolutionStrategyDescription(): string {
    return ComputationStateMachineAwareResolutionFacadeDecoratorImpl.RESOLUTION_STRATEGY;
  }

  resolveValue(value: number): string {
    const startTime = Date.now();
    this.stateMachine.reset();
    this.totalEvaluations++;

    const result = this.mediator.orchestrateComputationFlow(
      this.stateMachine,
      value,
      (v: number) => this.wrappedFacade.resolveValue(v),
      this.visitor,
    );

    const elapsedMs = Date.now() - startTime;
    if (elapsedMs <= this.slaThresholdMs) {
      this.slaCompliantEvaluations++;
    }
    this.totalStateTransitions += this.stateMachine.getTransitionCount();

    return result;
  }

  resolveRange(start: number, end: number): readonly string[] {
    return this.wrappedFacade.resolveRange(start, end);
  }
}

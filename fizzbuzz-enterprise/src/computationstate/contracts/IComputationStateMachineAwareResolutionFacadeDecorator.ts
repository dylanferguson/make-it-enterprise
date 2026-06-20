import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IComputationStateMachine } from "./IComputationStateMachine.js";
import type { IComputationStateMachineMediator } from "./IComputationStateMachineMediator.js";
import type { IComputationStateTransitionVisitor } from "./IComputationStateTransitionVisitor.js";

export interface IComputationStateMachineAwareResolutionFacadeDecorator
  extends IFizzBuzzSingleValueResolutionFacade
{
  getWrappedFacade(): IFizzBuzzSingleValueResolutionFacade;
  getStateMachine(): IComputationStateMachine;
  getMediator(): IComputationStateMachineMediator;
  getVisitor(): IComputationStateTransitionVisitor | null;
  getDecoratorName(): string;
  getDecoratorVersion(): string;
  getTotalStateTransitions(): number;
  getSlaCompliancePercentage(): number;
}

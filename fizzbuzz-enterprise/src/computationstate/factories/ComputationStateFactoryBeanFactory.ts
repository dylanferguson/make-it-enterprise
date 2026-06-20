import type { IComputationState } from "../contracts/IComputationState.js";
import { ComputationStateType } from "../contracts/IComputationState.js";
import { InitializedComputationStateImpl } from "../impl/states/InitializedComputationStateImpl.js";
import { ValidatingComputationStateImpl } from "../impl/states/ValidatingComputationStateImpl.js";
import { EvaluatingDivisibilityComputationStateImpl } from "../impl/states/EvaluatingDivisibilityComputationStateImpl.js";
import { ComposingOutputComputationStateImpl } from "../impl/states/ComposingOutputComputationStateImpl.js";
import { CompletedComputationStateImpl } from "../impl/states/CompletedComputationStateImpl.js";
import { ErrorComputationStateImpl } from "../impl/states/ErrorComputationStateImpl.js";

export class ComputationStateFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "ComputationStateFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-STATE-FACTORY";

  private static stateCache: Map<ComputationStateType, IComputationState> | null = null;

  static createInitializedState(): IComputationState {
    return new InitializedComputationStateImpl();
  }

  static createValidatingState(): IComputationState {
    return new ValidatingComputationStateImpl();
  }

  static createEvaluatingDivisibilityState(): IComputationState {
    return new EvaluatingDivisibilityComputationStateImpl();
  }

  static createComposingOutputState(): IComputationState {
    return new ComposingOutputComputationStateImpl();
  }

  static createCompletedState(): IComputationState {
    return new CompletedComputationStateImpl();
  }

  static createErrorState(): IComputationState {
    return new ErrorComputationStateImpl();
  }

  static createAllStates(): IComputationState[] {
    return [
      ComputationStateFactoryBeanFactory.createInitializedState(),
      ComputationStateFactoryBeanFactory.createValidatingState(),
      ComputationStateFactoryBeanFactory.createEvaluatingDivisibilityState(),
      ComputationStateFactoryBeanFactory.createComposingOutputState(),
      ComputationStateFactoryBeanFactory.createCompletedState(),
      ComputationStateFactoryBeanFactory.createErrorState(),
    ];
  }

  static getOrCreateCachedStates(): Map<ComputationStateType, IComputationState> {
    if (ComputationStateFactoryBeanFactory.stateCache === null) {
      ComputationStateFactoryBeanFactory.stateCache = new Map();
      for (const state of ComputationStateFactoryBeanFactory.createAllStates()) {
        ComputationStateFactoryBeanFactory.stateCache.set(state.getStateType(), state);
      }
    }
    return ComputationStateFactoryBeanFactory.stateCache;
  }

  static getFactoryBeanName(): string {
    return ComputationStateFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return ComputationStateFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}

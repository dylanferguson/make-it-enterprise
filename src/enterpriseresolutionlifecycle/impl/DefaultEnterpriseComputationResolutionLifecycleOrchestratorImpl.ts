import { AbstractBaseEnterpriseComputationResolutionLifecycleOrchestratorImpl } from "../abstracts/AbstractBaseEnterpriseComputationResolutionLifecycleOrchestratorImpl.js";
import { ComputedComputationOutcomeLifecycleStateImpl } from "./states/ComputedComputationOutcomeLifecycleStateImpl.js";
import { ValidatingComputationOutcomeLifecycleStateImpl } from "./states/ValidatingComputationOutcomeLifecycleStateImpl.js";
import { ValidatedComputationOutcomeLifecycleStateImpl } from "./states/ValidatedComputationOutcomeLifecycleStateImpl.js";
import { FormattingComputationOutcomeLifecycleStateImpl } from "./states/FormattingComputationOutcomeLifecycleStateImpl.js";
import { FormattedComputationOutcomeLifecycleStateImpl } from "./states/FormattedComputationOutcomeLifecycleStateImpl.js";

export class DefaultEnterpriseComputationResolutionLifecycleOrchestratorImpl
  extends AbstractBaseEnterpriseComputationResolutionLifecycleOrchestratorImpl
{
  constructor(
    orchestratorName: string,
    orchestratorVersion: string,
  ) {
    super(orchestratorName, orchestratorVersion);
  }

  getOrchestratorDescriptor(): string {
    return `DefaultEnterpriseComputationResolutionLifecycleOrchestratorImpl:name=${this.getOrchestratorName()}|version=${this.getOrchestratorVersion()}|visitors=${this.getRegisteredVisitors().length}|validators=${this.getRegisteredValidators().length}|chainActive=${this.getChainHead() !== null}`;
  }

  orchestrateSingleValueResolution(
    value: number,
    innerResolver: (v: number) => string,
  ): string {
    const computingState = this.createStateInstance("COMPUTING");
    this.notifyVisitorsOnStateTransition(
      this.getCurrentState(),
      computingState,
      value,
      null,
    );
    this.transitionToState(computingState);

    const chainResult = this.executeChainHandlers("PRE_COMPUTE", value, null);
    const preprocessedInput = chainResult !== null ? Number(chainResult) : value;

    const rawResult = innerResolver(preprocessedInput);

    const computedState = new ComputedComputationOutcomeLifecycleStateImpl();
    this.notifyVisitorsOnStateTransition(
      computingState,
      computedState,
      value,
      rawResult,
    );
    this.transitionToState(computedState);

    const validatingState = new ValidatingComputationOutcomeLifecycleStateImpl();
    this.notifyVisitorsOnStateTransition(
      computedState,
      validatingState,
      value,
      rawResult,
    );
    this.transitionToState(validatingState);

    const validated = this.validateResult(value, rawResult);

    const validatedState = new ValidatedComputationOutcomeLifecycleStateImpl();
    this.notifyVisitorsOnStateTransition(
      validatingState,
      validatedState,
      value,
      validated,
    );
    this.transitionToState(validatedState);

    const formattingState = new FormattingComputationOutcomeLifecycleStateImpl();
    this.notifyVisitorsOnStateTransition(
      validatedState,
      formattingState,
      value,
      validated,
    );
    this.transitionToState(formattingState);

    const postChainResult = this.executeChainHandlers("POST_COMPUTE", value, validated);
    const formattedResult = postChainResult ?? validated;

    this.notifyVisitorsOnFormatting(value, validated, formattedResult, this.getOrchestratorName());

    const formattedState = new FormattedComputationOutcomeLifecycleStateImpl();
    this.notifyVisitorsOnStateTransition(
      formattingState,
      formattedState,
      value,
      formattedResult,
    );
    this.transitionToState(formattedState);

    return formattedResult;
  }

  orchestrateRangeResolution(
    start: number,
    end: number,
    innerResolver: (v: number) => string,
  ): readonly string[] {
    const results: string[] = [];
    for (let i = start; i <= end; i++) {
      const resetState = this.createStateInstance("INITIALIZED");
      this.transitionToState(resetState);
      results.push(this.orchestrateSingleValueResolution(i, innerResolver));
    }
    return results;
  }
}

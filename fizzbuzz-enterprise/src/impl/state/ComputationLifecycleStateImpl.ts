import { AbstractBaseComputationLifecycleState } from "../../abstracts/AbstractBaseComputationLifecycleState.js";

export class InitializationComputationLifecycleStateImpl extends AbstractBaseComputationLifecycleState {
  private static readonly STATE_NAME = "Initialization";
  private static readonly STATE_CODE = "INIT";
  private static readonly STATE_PRIORITY = 0;
  private static readonly VALID_TRANSITIONS: ReadonlyArray<string> = ["EVALUATION", "ERROR"];

  constructor() {
    super(
      InitializationComputationLifecycleStateImpl.STATE_NAME,
      InitializationComputationLifecycleStateImpl.STATE_CODE,
      InitializationComputationLifecycleStateImpl.STATE_PRIORITY,
      InitializationComputationLifecycleStateImpl.VALID_TRANSITIONS,
      false,
      true,
    );
  }
}

export class EvaluationComputationLifecycleStateImpl extends AbstractBaseComputationLifecycleState {
  private static readonly STATE_NAME = "Evaluation";
  private static readonly STATE_CODE = "EVALUATION";
  private static readonly STATE_PRIORITY = 50;
  private static readonly VALID_TRANSITIONS: ReadonlyArray<string> = ["NORMALIZATION", "ERROR"];

  constructor() {
    super(
      EvaluationComputationLifecycleStateImpl.STATE_NAME,
      EvaluationComputationLifecycleStateImpl.STATE_CODE,
      EvaluationComputationLifecycleStateImpl.STATE_PRIORITY,
      EvaluationComputationLifecycleStateImpl.VALID_TRANSITIONS,
      false,
      false,
    );
  }
}

export class NormalizationComputationLifecycleStateImpl extends AbstractBaseComputationLifecycleState {
  private static readonly STATE_NAME = "Normalization";
  private static readonly STATE_CODE = "NORMALIZATION";
  private static readonly STATE_PRIORITY = 75;
  private static readonly VALID_TRANSITIONS: ReadonlyArray<string> = ["COMPLETION", "ERROR"];

  constructor() {
    super(
      NormalizationComputationLifecycleStateImpl.STATE_NAME,
      NormalizationComputationLifecycleStateImpl.STATE_CODE,
      NormalizationComputationLifecycleStateImpl.STATE_PRIORITY,
      NormalizationComputationLifecycleStateImpl.VALID_TRANSITIONS,
      false,
      false,
    );
  }
}

export class CompletionComputationLifecycleStateImpl extends AbstractBaseComputationLifecycleState {
  private static readonly STATE_NAME = "Completion";
  private static readonly STATE_CODE = "COMPLETION";
  private static readonly STATE_PRIORITY = 100;
  private static readonly VALID_TRANSITIONS: ReadonlyArray<string> = [];

  constructor() {
    super(
      CompletionComputationLifecycleStateImpl.STATE_NAME,
      CompletionComputationLifecycleStateImpl.STATE_CODE,
      CompletionComputationLifecycleStateImpl.STATE_PRIORITY,
      CompletionComputationLifecycleStateImpl.VALID_TRANSITIONS,
      true,
      false,
    );
  }
}

export class ErrorComputationLifecycleStateImpl extends AbstractBaseComputationLifecycleState {
  private static readonly STATE_NAME = "Error";
  private static readonly STATE_CODE = "ERROR";
  private static readonly STATE_PRIORITY = 200;
  private static readonly VALID_TRANSITIONS: ReadonlyArray<string> = ["COMPLETION"];

  constructor() {
    super(
      ErrorComputationLifecycleStateImpl.STATE_NAME,
      ErrorComputationLifecycleStateImpl.STATE_CODE,
      ErrorComputationLifecycleStateImpl.STATE_PRIORITY,
      ErrorComputationLifecycleStateImpl.VALID_TRANSITIONS,
      false,
      false,
    );
  }
}

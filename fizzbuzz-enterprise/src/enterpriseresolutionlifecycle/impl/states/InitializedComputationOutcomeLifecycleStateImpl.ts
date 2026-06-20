import { AbstractBaseComputationOutcomeLifecycleStateImpl } from "./AbstractBaseComputationOutcomeLifecycleStateImpl.js";

export class InitializedComputationOutcomeLifecycleStateImpl
  extends AbstractBaseComputationOutcomeLifecycleStateImpl
{
  constructor() {
    super(
      "InitializedComputationOutcomeLifecycleState",
      "1.0.0-STATE-INIT",
      "INITIALIZED",
      ["COMPUTING"],
    );
  }
}

import { AbstractBaseComputationOutcomeLifecycleStateImpl } from "./AbstractBaseComputationOutcomeLifecycleStateImpl.js";

export class ComputedComputationOutcomeLifecycleStateImpl
  extends AbstractBaseComputationOutcomeLifecycleStateImpl
{
  constructor() {
    super(
      "ComputedComputationOutcomeLifecycleState",
      "1.0.0-STATE-CMPD",
      "COMPUTED",
      ["VALIDATING"],
    );
  }
}

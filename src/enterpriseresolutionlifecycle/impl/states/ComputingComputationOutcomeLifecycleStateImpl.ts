import { AbstractBaseComputationOutcomeLifecycleStateImpl } from "./AbstractBaseComputationOutcomeLifecycleStateImpl.js";

export class ComputingComputationOutcomeLifecycleStateImpl
  extends AbstractBaseComputationOutcomeLifecycleStateImpl
{
  constructor() {
    super(
      "ComputingComputationOutcomeLifecycleState",
      "1.0.0-STATE-CMPT",
      "COMPUTING",
      ["COMPUTED", "VALIDATING"],
    );
  }
}

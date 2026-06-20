import { AbstractBaseComputationOutcomeLifecycleStateImpl } from "./AbstractBaseComputationOutcomeLifecycleStateImpl.js";

export class ValidatingComputationOutcomeLifecycleStateImpl
  extends AbstractBaseComputationOutcomeLifecycleStateImpl
{
  constructor() {
    super(
      "ValidatingComputationOutcomeLifecycleState",
      "1.0.0-STATE-VLDT",
      "VALIDATING",
      ["VALIDATED", "COMPUTING"],
    );
  }
}

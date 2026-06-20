import { AbstractBaseComputationOutcomeLifecycleStateImpl } from "./AbstractBaseComputationOutcomeLifecycleStateImpl.js";

export class ValidatedComputationOutcomeLifecycleStateImpl
  extends AbstractBaseComputationOutcomeLifecycleStateImpl
{
  constructor() {
    super(
      "ValidatedComputationOutcomeLifecycleState",
      "1.0.0-STATE-VLDD",
      "VALIDATED",
      ["FORMATTING"],
    );
  }
}

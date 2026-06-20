import { AbstractBaseComputationOutcomeLifecycleStateImpl } from "./AbstractBaseComputationOutcomeLifecycleStateImpl.js";

export class FormattedComputationOutcomeLifecycleStateImpl
  extends AbstractBaseComputationOutcomeLifecycleStateImpl
{
  constructor() {
    super(
      "FormattedComputationOutcomeLifecycleState",
      "1.0.0-STATE-FRMD",
      "FORMATTED",
      [],
    );
  }
}

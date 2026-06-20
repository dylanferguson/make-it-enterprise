import { AbstractBaseComputationOutcomeLifecycleStateImpl } from "./AbstractBaseComputationOutcomeLifecycleStateImpl.js";

export class FormattingComputationOutcomeLifecycleStateImpl
  extends AbstractBaseComputationOutcomeLifecycleStateImpl
{
  constructor() {
    super(
      "FormattingComputationOutcomeLifecycleState",
      "1.0.0-STATE-FRMT",
      "FORMATTING",
      ["FORMATTED"],
    );
  }
}

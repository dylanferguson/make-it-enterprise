import { AbstractBaseEnterpriseDivisibilityOrchestrationTemplateMethod } from "../abstracts/AbstractBaseEnterpriseDivisibilityOrchestrationTemplateMethod.js";

export class StandardEnterpriseDivisibilityOrchestrationTemplateMethodImpl
  extends AbstractBaseEnterpriseDivisibilityOrchestrationTemplateMethod
{
  private static readonly TEMPLATE_NAME = "StandardEnterpriseDivisibilityOrchestrationTemplateMethod";
  private static readonly TEMPLATE_VERSION = "1.0.0-TEMPLATE-METHOD-BRIDGE-PATTERN";

  private evaluationCount: number = 0;

  constructor() {
    super(
      StandardEnterpriseDivisibilityOrchestrationTemplateMethodImpl.TEMPLATE_NAME,
      StandardEnterpriseDivisibilityOrchestrationTemplateMethodImpl.TEMPLATE_VERSION,
    );
  }

  getEvaluationCount(): number {
    return this.evaluationCount;
  }

  protected override postEvaluationHook(
    _dividend: number,
    _divisor: number,
    _remainder: number,
    _result: boolean,
  ): void {
    this.evaluationCount++;
  }
}

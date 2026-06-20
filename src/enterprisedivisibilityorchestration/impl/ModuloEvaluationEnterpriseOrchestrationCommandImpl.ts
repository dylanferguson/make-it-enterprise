import { AbstractBaseEnterpriseDivisibilityOrchestrationCommand } from "../abstracts/AbstractBaseEnterpriseDivisibilityOrchestrationCommand.js";
import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IEnterpriseDivisibilityOrchestrationTemplateMethod } from "../contracts/IEnterpriseDivisibilityOrchestrationTemplateMethod.js";

export class ModuloEvaluationEnterpriseOrchestrationCommandImpl
  extends AbstractBaseEnterpriseDivisibilityOrchestrationCommand
{
  private static readonly COMMAND_NAME = "ModuloEvaluationEnterpriseOrchestrationCommand";
  private static readonly COMMAND_VERSION = "1.0.0-COMMAND-PATTERN-ORCHESTRATION";

  private readonly targetDivisor: number;
  private readonly outputLabel: string;

  constructor(
    innerFacade: IFizzBuzzSingleValueResolutionFacade,
    orchestrationTemplate: IEnterpriseDivisibilityOrchestrationTemplateMethod,
    targetDivisor: number,
    outputLabel: string,
  ) {
    super(
      ModuloEvaluationEnterpriseOrchestrationCommandImpl.COMMAND_NAME,
      ModuloEvaluationEnterpriseOrchestrationCommandImpl.COMMAND_VERSION,
      innerFacade,
      orchestrationTemplate,
    );
    this.targetDivisor = targetDivisor;
    this.outputLabel = outputLabel;
  }

  getTargetDivisor(): number {
    return this.targetDivisor;
  }

  getOutputLabel(): string {
    return this.outputLabel;
  }

  override execute(payload: number): string {
    const isDivisible = this.orchestrationTemplate.evaluateDivisibility(
      payload,
      this.targetDivisor,
    );
    if (isDivisible) {
      return this.outputLabel;
    }
    return this.invokeInnerResolution(payload);
  }
}

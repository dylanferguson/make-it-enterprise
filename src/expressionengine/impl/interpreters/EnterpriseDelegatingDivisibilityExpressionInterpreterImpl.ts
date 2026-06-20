import { AbstractBaseEnterpriseDivisibilityExpressionInterpreter } from "../../abstracts/index.js";
import type { IEnterpriseDivisibilityExpression, IEnterpriseDivisibilityExpressionEvaluationResult, IEnterpriseDivisibilityExpressionEvaluatorRegistry } from "../../contracts/index.js";

export class EnterpriseDelegatingDivisibilityExpressionInterpreterImpl
  extends AbstractBaseEnterpriseDivisibilityExpressionInterpreter
{
  private static readonly INTERPRETER_NAME = "EnterpriseDelegatingDivisibilityExpressionInterpreter";
  private static readonly INTERPRETER_VERSION = "1.0.0-DELEGATING-EXPRESSION-INTERPRETER";

  private interpretationCount: number = 0;

  constructor(registry: IEnterpriseDivisibilityExpressionEvaluatorRegistry) {
    super(
      EnterpriseDelegatingDivisibilityExpressionInterpreterImpl.INTERPRETER_NAME,
      EnterpriseDelegatingDivisibilityExpressionInterpreterImpl.INTERPRETER_VERSION,
      registry,
    );
  }

  override interpret(expression: IEnterpriseDivisibilityExpression): IEnterpriseDivisibilityExpressionEvaluationResult {
    this.interpretationCount++;
    const evaluator = this.registry.resolveEvaluator(expression);
    if (evaluator === null) {
      throw new Error(
        `[${EnterpriseDelegatingDivisibilityExpressionInterpreterImpl.INTERPRETER_NAME}] ` +
        `No registered evaluator could handle expression: ${expression.getExpressionDescriptor()} ` +
        `(type=${expression.getExpressionType()})`,
      );
    }
    console.debug(
      `[EnterpriseDelegatingDivisibilityExpressionInterpreter] Interpreting expression [${expression.getExpressionDescriptor()}] ` +
      `via evaluator [${evaluator.getEvaluatorName()} v${evaluator.getEvaluatorVersion()}] ` +
      `[interpretationCount=${this.interpretationCount}]`,
    );
    return evaluator.evaluate(expression);
  }

  getInterpretationCount(): number {
    return this.interpretationCount;
  }
}

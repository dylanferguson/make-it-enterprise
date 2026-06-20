import { AbstractBaseDivisibilityOperator } from "../../abstracts/AbstractBaseDivisibilityOperator.js";
import { EnterpriseDivisibilityExpressionInterpreterFactoryBeanFactory } from "../../../expressionengine/factories/EnterpriseDivisibilityExpressionInterpreterFactoryBeanFactory.js";
import { DivisibilityExpressionFactoryBeanFactory } from "../../../expressionengine/factories/DivisibilityExpressionFactoryBeanFactory.js";
import { EnterpriseDivisibilityExpressionEvaluatorRegistryFactoryBeanFactory } from "../../../expressionengine/factories/EnterpriseDivisibilityExpressionEvaluatorRegistryFactoryBeanFactory.js";

export class StandardRemainderBasedDivisibilityOperatorImpl extends AbstractBaseDivisibilityOperator {
  private static readonly OPERATOR_NAME = "StandardRemainderBasedDivisibilityOperator";
  private static readonly OPERATOR_VERSION = "2.0.0-EXPRESSION-INTERPRETER-ENABLED";

  private static infrastructureInitialized = false;

  constructor() {
    super(
      StandardRemainderBasedDivisibilityOperatorImpl.OPERATOR_NAME,
      StandardRemainderBasedDivisibilityOperatorImpl.OPERATOR_VERSION,
    );
  }

  override isDivisibleBy(dividend: number, divisor: number): boolean {
    this.validateOperands(dividend, divisor);
    this.ensureExpressionInfrastructure();
    const expressionFactory = DivisibilityExpressionFactoryBeanFactory.createFactory();
    const expression = expressionFactory.createExpression(dividend, divisor);
    const interpreter = EnterpriseDivisibilityExpressionInterpreterFactoryBeanFactory.createInterpreter();
    const result = interpreter.interpret(expression);
    return result.isDivisible();
  }

  private ensureExpressionInfrastructure(): void {
    if (!StandardRemainderBasedDivisibilityOperatorImpl.infrastructureInitialized) {
      EnterpriseDivisibilityExpressionEvaluatorRegistryFactoryBeanFactory.createRegistry();
      StandardRemainderBasedDivisibilityOperatorImpl.infrastructureInitialized = true;
    }
  }
}

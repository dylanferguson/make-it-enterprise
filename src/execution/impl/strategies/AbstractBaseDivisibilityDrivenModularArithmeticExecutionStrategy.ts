import { AbstractBaseModularArithmeticExecutionStrategy } from "../../abstracts/AbstractBaseModularArithmeticExecutionStrategy.js";
import { EnterpriseDivisibilityExpressionInterpreterFactoryBeanFactory } from "../../../expressionengine/factories/EnterpriseDivisibilityExpressionInterpreterFactoryBeanFactory.js";
import { DivisibilityExpressionFactoryBeanFactory } from "../../../expressionengine/factories/DivisibilityExpressionFactoryBeanFactory.js";
import { EnterpriseDivisibilityExpressionEvaluatorRegistryFactoryBeanFactory } from "../../../expressionengine/factories/EnterpriseDivisibilityExpressionEvaluatorRegistryFactoryBeanFactory.js";

export class AbstractBaseDivisibilityDrivenModularArithmeticExecutionStrategy
  extends AbstractBaseModularArithmeticExecutionStrategy
{
  private static infrastructureInitialized = false;

  private readonly strategyName: string;
  private readonly strategyVersion: string;
  private readonly supportedDivisor: number;
  private readonly outputMessage: string;

  constructor(
    strategyName: string,
    strategyVersion: string,
    supportedDivisor: number,
    outputMessage: string,
  ) {
    super();
    this.strategyName = strategyName;
    this.strategyVersion = strategyVersion;
    this.supportedDivisor = supportedDivisor;
    this.outputMessage = outputMessage;
    AbstractBaseDivisibilityDrivenModularArithmeticExecutionStrategy.ensureInfrastructure();
  }

  override getStrategyName(): string {
    return this.strategyName;
  }

  override getStrategyVersion(): string {
    return this.strategyVersion;
  }

  override getSupportedDivisor(): number {
    return this.supportedDivisor;
  }

  override executeValueResolution(
    value: number,
    innerResolutionDelegate: (v: number) => string,
  ): string {
    this.validateStrategyValue(value);
    const expressionFactory = DivisibilityExpressionFactoryBeanFactory.createFactory();
    const expression = expressionFactory.createExpression(value, this.supportedDivisor);
    const interpreter = EnterpriseDivisibilityExpressionInterpreterFactoryBeanFactory.createInterpreter();
    const result = interpreter.interpret(expression);
    if (result.isDivisible()) {
      return this.outputMessage;
    }
    return innerResolutionDelegate(value);
  }

  private static ensureInfrastructure(): void {
    if (!AbstractBaseDivisibilityDrivenModularArithmeticExecutionStrategy.infrastructureInitialized) {
      EnterpriseDivisibilityExpressionEvaluatorRegistryFactoryBeanFactory.createRegistry();
      AbstractBaseDivisibilityDrivenModularArithmeticExecutionStrategy.infrastructureInitialized = true;
    }
  }
}

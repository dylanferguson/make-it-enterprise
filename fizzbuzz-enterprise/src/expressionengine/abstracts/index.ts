import type {
  IEnterpriseDivisibilityExpression,
  IEnterpriseDivisibilityExpressionEvaluationResult,
  IEnterpriseDivisibilityExpressionEvaluator,
  IEnterpriseDivisibilityExpressionEvaluatorRegistry,
  IEnterpriseDivisibilityExpressionFactory,
  IEnterpriseDivisibilityExpressionInterpreter,
} from "../contracts/index.js";

export abstract class AbstractBaseEnterpriseDivisibilityExpression implements IEnterpriseDivisibilityExpression {
  private static readonly DEFAULT_EXPRESSION_TYPE = "ENTERPRISE_DIVISIBILITY_EXPRESSION";

  private readonly dividend: number;
  private readonly divisor: number;
  private readonly expressionType: string;
  private readonly expressionDescriptor: string;

  constructor(dividend: number, divisor: number, expressionDescriptor: string, expressionType?: string) {
    this.dividend = dividend;
    this.divisor = divisor;
    this.expressionType = expressionType ?? AbstractBaseEnterpriseDivisibilityExpression.DEFAULT_EXPRESSION_TYPE;
    this.expressionDescriptor = expressionDescriptor;
  }

  getDividend(): number {
    return this.dividend;
  }

  getDivisor(): number {
    return this.divisor;
  }

  getExpressionType(): string {
    return this.expressionType;
  }

  getExpressionDescriptor(): string {
    return this.expressionDescriptor;
  }

  abstract clone(): IEnterpriseDivisibilityExpression;
}

export abstract class AbstractBaseEnterpriseDivisibilityExpressionEvaluationResult
  implements IEnterpriseDivisibilityExpressionEvaluationResult
{
  private readonly dividend: number;
  private readonly divisor: number;
  private readonly isDivisibleValue: boolean;
  private readonly evaluatorIdentifier: string;
  private readonly evaluationTimestamp: number;

  constructor(dividend: number, divisor: number, isDivisible: boolean, evaluatorIdentifier: string) {
    this.dividend = dividend;
    this.divisor = divisor;
    this.isDivisibleValue = isDivisible;
    this.evaluatorIdentifier = evaluatorIdentifier;
    this.evaluationTimestamp = Date.now();
  }

  getDividend(): number {
    return this.dividend;
  }

  getDivisor(): number {
    return this.divisor;
  }

  isDivisible(): boolean {
    return this.isDivisibleValue;
  }

  getEvaluatorIdentifier(): string {
    return this.evaluatorIdentifier;
  }

  getEvaluationTimestamp(): number {
    return this.evaluationTimestamp;
  }

  abstract getResultDescriptor(): string;
}

export abstract class AbstractBaseEnterpriseDivisibilityExpressionEvaluator
  implements IEnterpriseDivisibilityExpressionEvaluator
{
  private readonly evaluatorName: string;
  private readonly evaluatorVersion: string;

  constructor(evaluatorName: string, evaluatorVersion: string) {
    this.evaluatorName = evaluatorName;
    this.evaluatorVersion = evaluatorVersion;
  }

  getEvaluatorName(): string {
    return this.evaluatorName;
  }

  getEvaluatorVersion(): string {
    return this.evaluatorVersion;
  }

  abstract getSupportedExpressionTypes(): readonly string[];
  abstract canEvaluate(expression: IEnterpriseDivisibilityExpression): boolean;
  abstract evaluate(expression: IEnterpriseDivisibilityExpression): IEnterpriseDivisibilityExpressionEvaluationResult;
}

export abstract class AbstractBaseEnterpriseDivisibilityExpressionEvaluatorRegistry
  implements IEnterpriseDivisibilityExpressionEvaluatorRegistry
{
  private readonly registryName: string;
  private readonly registryVersion: string;

  constructor(registryName: string, registryVersion: string) {
    this.registryName = registryName;
    this.registryVersion = registryVersion;
  }

  getRegistryName(): string {
    return this.registryName;
  }

  getRegistryVersion(): string {
    return this.registryVersion;
  }

  abstract registerEvaluator(evaluator: IEnterpriseDivisibilityExpressionEvaluator): void;
  abstract unregisterEvaluator(evaluatorName: string): boolean;
  abstract resolveEvaluator(expression: IEnterpriseDivisibilityExpression): IEnterpriseDivisibilityExpressionEvaluator | null;
  abstract getRegisteredEvaluatorNames(): readonly string[];
  abstract getEvaluatorCount(): number;
  abstract clearRegistry(): void;
}

export abstract class AbstractBaseEnterpriseDivisibilityExpressionInterpreter
  implements IEnterpriseDivisibilityExpressionInterpreter
{
  private readonly interpreterName: string;
  private readonly interpreterVersion: string;
  protected readonly registry: IEnterpriseDivisibilityExpressionEvaluatorRegistry;

  constructor(
    interpreterName: string,
    interpreterVersion: string,
    registry: IEnterpriseDivisibilityExpressionEvaluatorRegistry,
  ) {
    this.interpreterName = interpreterName;
    this.interpreterVersion = interpreterVersion;
    this.registry = registry;
  }

  getInterpreterName(): string {
    return this.interpreterName;
  }

  getInterpreterVersion(): string {
    return this.interpreterVersion;
  }

  abstract interpret(expression: IEnterpriseDivisibilityExpression): IEnterpriseDivisibilityExpressionEvaluationResult;
}

export abstract class AbstractBaseEnterpriseDivisibilityExpressionFactory
  implements IEnterpriseDivisibilityExpressionFactory
{
  private readonly factoryName: string;
  private readonly factoryVersion: string;

  constructor(factoryName: string, factoryVersion: string) {
    this.factoryName = factoryName;
    this.factoryVersion = factoryVersion;
  }

  getFactoryName(): string {
    return this.factoryName;
  }

  getFactoryVersion(): string {
    return this.factoryVersion;
  }

  abstract createExpression(dividend: number, divisor: number): IEnterpriseDivisibilityExpression;
}

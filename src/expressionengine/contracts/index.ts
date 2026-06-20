export interface IEnterpriseDivisibilityExpression {
  getDividend(): number;
  getDivisor(): number;
  getExpressionType(): string;
  getExpressionDescriptor(): string;
  clone(): IEnterpriseDivisibilityExpression;
}

export interface IEnterpriseDivisibilityExpressionEvaluationResult {
  getDividend(): number;
  getDivisor(): number;
  isDivisible(): boolean;
  getResultDescriptor(): string;
  getEvaluatorIdentifier(): string;
  getEvaluationTimestamp(): number;
}

export interface IEnterpriseDivisibilityExpressionEvaluator {
  getEvaluatorName(): string;
  getEvaluatorVersion(): string;
  getSupportedExpressionTypes(): readonly string[];
  canEvaluate(expression: IEnterpriseDivisibilityExpression): boolean;
  evaluate(expression: IEnterpriseDivisibilityExpression): IEnterpriseDivisibilityExpressionEvaluationResult;
}

export interface IEnterpriseDivisibilityExpressionEvaluatorRegistry {
  getRegistryName(): string;
  getRegistryVersion(): string;
  registerEvaluator(evaluator: IEnterpriseDivisibilityExpressionEvaluator): void;
  unregisterEvaluator(evaluatorName: string): boolean;
  resolveEvaluator(expression: IEnterpriseDivisibilityExpression): IEnterpriseDivisibilityExpressionEvaluator | null;
  getRegisteredEvaluatorNames(): readonly string[];
  getEvaluatorCount(): number;
  clearRegistry(): void;
}

export interface IEnterpriseDivisibilityExpressionInterpreter {
  getInterpreterName(): string;
  getInterpreterVersion(): string;
  interpret(expression: IEnterpriseDivisibilityExpression): IEnterpriseDivisibilityExpressionEvaluationResult;
}

export interface IEnterpriseDivisibilityExpressionFactory {
  getFactoryName(): string;
  getFactoryVersion(): string;
  createExpression(dividend: number, divisor: number): IEnterpriseDivisibilityExpression;
}

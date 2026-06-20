export interface ICompositeDivisibilityExpression {
  getExpressionType(): string;
  getExpressionDescriptor(): string;
  getChildExpressions(): readonly ICompositeDivisibilityExpression[];
  isComposite(): boolean;
  accept(visitor: ICompositeDivisibilityExpressionVisitor): void;
}

export interface ICompositeDivisibilityExpressionEvaluationContext {
  getInputValue(): number;
  setDivisibilityResult(divisor: number, isDivisible: boolean): void;
  getDivisibilityResult(divisor: number): boolean | null;
  getConsolidatedDivisibilityMap(): ReadonlyMap<number, boolean>;
  getEvaluationDescriptor(): string;
}

export interface ICompositeDivisibilityExpressionEvaluationOutcome {
  getExpressionDescriptor(): string;
  getEvaluationContext(): ICompositeDivisibilityExpressionEvaluationContext;
  isDivisibleByThree(): boolean;
  isDivisibleByFive(): boolean;
  isDivisibleByFifteen(): boolean;
  getCompositeResultValue(): string;
  getOutcomeDescriptor(): string;
}

export interface ICompositeDivisibilityExpressionVisitor {
  getVisitorName(): string;
  getVisitorVersion(): string;
  visitExpression(expression: ICompositeDivisibilityExpression): void;
  visitDivisibleBy(expression: ICompositeDivisibilityExpression): void;
  visitAnd(expression: ICompositeDivisibilityExpression): void;
  visitOr(expression: ICompositeDivisibilityExpression): void;
  visitValue(expression: ICompositeDivisibilityExpression): void;
  getEvaluationContext(): ICompositeDivisibilityExpressionEvaluationContext;
  reset(): void;
}

export interface ICompositeDivisibilityExpressionInterpreter {
  getInterpreterName(): string;
  getInterpreterVersion(): string;
  interpret(expression: ICompositeDivisibilityExpression): ICompositeDivisibilityExpressionEvaluationOutcome;
}

export interface ICompositeExpressionTreeFactory {
  getFactoryName(): string;
  getFactoryVersion(): string;
  createDivisibleByExpression(value: number, divisor: number): ICompositeDivisibilityExpression;
  createAndExpression(left: ICompositeDivisibilityExpression, right: ICompositeDivisibilityExpression): ICompositeDivisibilityExpression;
  createOrExpression(left: ICompositeDivisibilityExpression, right: ICompositeDivisibilityExpression): ICompositeDivisibilityExpression;
  createValueExpression(value: number): ICompositeDivisibilityExpression;
  createStandardFizzBuzzExpressionTree(value: number): ICompositeDivisibilityExpression;
}

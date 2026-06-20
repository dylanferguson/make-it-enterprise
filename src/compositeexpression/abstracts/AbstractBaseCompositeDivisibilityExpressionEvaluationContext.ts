import type {
  ICompositeDivisibilityExpressionEvaluationContext,
  ICompositeDivisibilityExpressionEvaluationOutcome,
} from "../contracts/index.js";

export abstract class AbstractBaseCompositeDivisibilityExpressionEvaluationContext
  implements ICompositeDivisibilityExpressionEvaluationContext
{
  private readonly inputValue: number;
  private readonly divisibilityMap: Map<number, boolean>;

  constructor(inputValue: number) {
    this.inputValue = inputValue;
    this.divisibilityMap = new Map();
  }

  getInputValue(): number {
    return this.inputValue;
  }

  setDivisibilityResult(divisor: number, isDivisible: boolean): void {
    this.divisibilityMap.set(divisor, isDivisible);
  }

  getDivisibilityResult(divisor: number): boolean | null {
    return this.divisibilityMap.get(divisor) ?? null;
  }

  getConsolidatedDivisibilityMap(): ReadonlyMap<number, boolean> {
    return this.divisibilityMap;
  }

  abstract getEvaluationDescriptor(): string;
}

export abstract class AbstractBaseCompositeDivisibilityExpressionEvaluationOutcome
  implements ICompositeDivisibilityExpressionEvaluationOutcome
{
  private readonly expressionDescriptor: string;
  private readonly evaluationContext: ICompositeDivisibilityExpressionEvaluationContext;

  constructor(
    expressionDescriptor: string,
    evaluationContext: ICompositeDivisibilityExpressionEvaluationContext,
  ) {
    this.expressionDescriptor = expressionDescriptor;
    this.evaluationContext = evaluationContext;
  }

  getExpressionDescriptor(): string {
    return this.expressionDescriptor;
  }

  getEvaluationContext(): ICompositeDivisibilityExpressionEvaluationContext {
    return this.evaluationContext;
  }

  abstract isDivisibleByThree(): boolean;
  abstract isDivisibleByFive(): boolean;
  abstract isDivisibleByFifteen(): boolean;
  abstract getCompositeResultValue(): string;
  abstract getOutcomeDescriptor(): string;
}

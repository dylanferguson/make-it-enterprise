import type { IFizzBuzzExpression } from "../../contracts/IFizzBuzzExpression.js";
import type { IFizzBuzzRuleDefinition } from "../../contracts/IFizzBuzzRuleDefinition.js";

export class FizzBuzzRuleDefinitionImpl implements IFizzBuzzRuleDefinition {
  private readonly expression: IFizzBuzzExpression;
  private readonly outputLabel: string;
  private readonly rulePriority: number;
  private readonly ruleName: string;
  private enabled: boolean;

  constructor(
    ruleName: string,
    expression: IFizzBuzzExpression,
    outputLabel: string,
    rulePriority: number = 0,
    enabled: boolean = true,
  ) {
    this.ruleName = ruleName;
    this.expression = expression;
    this.outputLabel = outputLabel;
    this.rulePriority = rulePriority;
    this.enabled = enabled;
  }

  getExpression(): IFizzBuzzExpression {
    return this.expression;
  }

  getOutputLabel(): string {
    return this.outputLabel;
  }

  getRulePriority(): number {
    return this.rulePriority;
  }

  getRuleName(): string {
    return this.ruleName;
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }
}


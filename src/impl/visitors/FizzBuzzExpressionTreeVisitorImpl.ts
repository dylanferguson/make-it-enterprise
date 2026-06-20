import { AbstractBaseFizzBuzzExpressionVisitor } from "../../abstracts/AbstractBaseFizzBuzzExpressionVisitor.js";
import type { IFizzBuzzExpression } from "../../contracts/IFizzBuzzExpression.js";

export class FizzBuzzExpressionTreeVisitorImpl extends AbstractBaseFizzBuzzExpressionVisitor {
  private static readonly VISITOR_NAME = "FizzBuzzExpressionTreeVisitor";
  private static readonly VISITOR_VERSION = "1.0.0-VISITOR";
  private readonly treeLines: string[] = [];
  private depth: number = 0;

  override visitDivisibleBy(expression: IFizzBuzzExpression, divisor: number): void {
    this.treeLines.push(`${this.indent()}DivisibleBy(divisor=${divisor})`);
  }

  override visitAnd(
    expression: IFizzBuzzExpression,
    left: IFizzBuzzExpression,
    right: IFizzBuzzExpression,
  ): void {
    this.treeLines.push(`${this.indent()}And:`);
    this.depth++;
    left.accept(this);
    right.accept(this);
    this.depth--;
  }

  override visitOr(
    expression: IFizzBuzzExpression,
    left: IFizzBuzzExpression,
    right: IFizzBuzzExpression,
  ): void {
    this.treeLines.push(`${this.indent()}Or:`);
    this.depth++;
    left.accept(this);
    right.accept(this);
    this.depth--;
  }

  override visitNot(expression: IFizzBuzzExpression, inner: IFizzBuzzExpression): void {
    this.treeLines.push(`${this.indent()}Not:`);
    this.depth++;
    inner.accept(this);
    this.depth--;
  }

  override visitTrue(expression: IFizzBuzzExpression): void {
    this.treeLines.push(`${this.indent()}True`);
  }

  override getVisitorName(): string {
    return FizzBuzzExpressionTreeVisitorImpl.VISITOR_NAME;
  }

  override getVisitorVersion(): string {
    return FizzBuzzExpressionTreeVisitorImpl.VISITOR_VERSION;
  }

  getTreeOutput(): readonly string[] {
    return [...this.treeLines];
  }

  reset(): void {
    this.treeLines.length = 0;
    this.depth = 0;
  }

  private indent(): string {
    return "  ".repeat(this.depth);
  }
}

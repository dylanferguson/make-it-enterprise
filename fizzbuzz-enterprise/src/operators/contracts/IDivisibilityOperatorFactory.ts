import type { IDivisibilityOperator } from "./IDivisibilityOperator.js";

export interface IDivisibilityOperatorFactory {
  getFactoryName(): string;
  getFactoryVersion(): string;
  createOperator(): IDivisibilityOperator;
  createOperatorWithContext(context: string): IDivisibilityOperator;
}

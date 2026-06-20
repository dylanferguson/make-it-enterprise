import type { IEnterpriseDivisibilityOrchestrationBridgeImplementor } from "./IEnterpriseDivisibilityOrchestrationBridgeImplementor.js";

export interface IEnterpriseDivisibilityOrchestrationTemplateMethod {
  getTemplateMethodName(): string;
  getTemplateMethodVersion(): string;
  setBridgeImplementor(implementor: IEnterpriseDivisibilityOrchestrationBridgeImplementor): void;
  getBridgeImplementor(): IEnterpriseDivisibilityOrchestrationBridgeImplementor | null;
  evaluateDivisibility(dividend: number, divisor: number): boolean;
}

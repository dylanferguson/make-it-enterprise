export interface IEnterpriseDivisibilityOrchestrationBridgeImplementor {
  getImplementorName(): string;
  getImplementorVersion(): string;
  computeRemainder(dividend: number, divisor: number): number;
}

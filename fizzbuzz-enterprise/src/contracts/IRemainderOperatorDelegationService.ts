export interface IRemainderOperatorDelegationService {
  computeRemainder(dividend: number, divisor: number): number;
  getDelegationServiceName(): string;
  getDelegationServiceVersion(): string;
  supportsOperands(dividend: number, divisor: number): boolean;
}

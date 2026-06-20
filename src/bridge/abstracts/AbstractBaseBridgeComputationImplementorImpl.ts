import type { IBridgeComputationImplementor } from "../contracts/IBridgeComputationImplementor.js";

export abstract class AbstractBaseBridgeComputationImplementorImpl
  implements IBridgeComputationImplementor
{
  private readonly _implementorName: string;
  private readonly _implementorVersion: string;

  constructor(implementorName: string, implementorVersion: string) {
    this._implementorName = implementorName;
    this._implementorVersion = implementorVersion;
  }

  getImplementorName(): string {
    return this._implementorName;
  }

  getImplementorVersion(): string {
    return this._implementorVersion;
  }

  abstract computeRemainder(dividend: number, divisor: number): number;

  isExactDivisible(dividend: number, divisor: number): boolean {
    const remainder = this.computeRemainder(dividend, divisor);
    return remainder === 0;
  }
}


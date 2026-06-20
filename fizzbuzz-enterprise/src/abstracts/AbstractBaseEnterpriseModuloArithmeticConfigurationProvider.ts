import type { IEnterpriseModuloArithmeticConfigurationProvider } from "../contracts/IEnterpriseModuloArithmeticConfigurationProvider.js";

export abstract class AbstractBaseEnterpriseModuloArithmeticConfigurationProvider
  implements IEnterpriseModuloArithmeticConfigurationProvider
{
  protected static readonly DEFAULT_RESOLUTION_PRIORITY = 100;

  abstract getDivisorConstants(): readonly number[];
  abstract getDivisorCandidates(): readonly number[];
  abstract getConfigurationProviderName(): string;
  abstract getConfigurationProviderVersion(): string;
  abstract getConfigurationProfile(): string;

  isDivisorRegistered(divisor: number): boolean {
    return this.getDivisorCandidates().includes(divisor);
  }

  getResolutionPriority(divisor: number): number {
    const index = this.getDivisorCandidates().indexOf(divisor);
    if (index === -1) {
      return -1;
    }
    return (this.getDivisorCandidates().length - index) * AbstractBaseEnterpriseModuloArithmeticConfigurationProvider.DEFAULT_RESOLUTION_PRIORITY;
  }

  protected assertDivisorRange(divisor: number): void {
    if (!Number.isFinite(divisor) || divisor <= 0) {
      throw new Error(
        `[${this.getConfigurationProviderName()} v${this.getConfigurationProviderVersion()}] ` +
        `Invalid divisor: ${divisor}. Divisor must be a positive finite number.`,
      );
    }
  }
}

import type { IEnterpriseComputationResolutionAdapter } from "../contracts/IEnterpriseComputationResolutionAdapter.js";

export abstract class AbstractBaseEnterpriseComputationResolutionAdapter
  implements IEnterpriseComputationResolutionAdapter
{
  protected readonly adapterName: string;
  protected readonly adapterVersion: string;
  protected readonly divisor: number;
  protected readonly outputLabel: string;

  constructor(
    adapterName: string,
    adapterVersion: string,
    divisor: number,
    outputLabel: string,
  ) {
    this.adapterName = adapterName;
    this.adapterVersion = adapterVersion;
    this.divisor = divisor;
    this.outputLabel = outputLabel;
  }

  abstract canHandle(value: number): boolean;

  compute(value: number): string {
    return this.outputLabel;
  }

  getAdapterName(): string {
    return this.adapterName;
  }

  getAdapterVersion(): string {
    return this.adapterVersion;
  }

  getAdapterDivisor(): number {
    return this.divisor;
  }

  getAdapterOutputLabel(): string {
    return this.outputLabel;
  }
}

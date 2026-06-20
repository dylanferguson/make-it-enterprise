import type { IEnterpriseClassificationStrategyProvider } from "../contracts/index.js";
import type { IEnterpriseClassificationRegistry } from "../contracts/index.js";

export abstract class AbstractBaseEnterpriseClassificationStrategyProvider
  implements IEnterpriseClassificationStrategyProvider
{
  protected abstract readonly providerName: string;
  protected abstract readonly providerVersion: string;

  abstract getRegisteredClassificationDivisors(): readonly number[];
  abstract registerClassificationDefinition(divisor: number, classification: string): void;
  abstract resolveClassificationForValue(value: number): readonly string[];
  abstract getClassificationRegistry(): IEnterpriseClassificationRegistry;

  getProviderName(): string {
    return this.providerName;
  }

  getProviderVersion(): string {
    return this.providerVersion;
  }
}

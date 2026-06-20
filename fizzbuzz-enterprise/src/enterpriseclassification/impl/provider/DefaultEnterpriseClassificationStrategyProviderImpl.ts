import { AbstractBaseEnterpriseClassificationStrategyProvider } from "../../abstracts/AbstractBaseEnterpriseClassificationStrategyProvider.js";
import type { IEnterpriseClassificationRegistry } from "../../contracts/index.js";
import { StandardEnterpriseClassificationRegistryImpl } from "../registry/StandardEnterpriseClassificationRegistryImpl.js";

export class DefaultEnterpriseClassificationStrategyProviderImpl
  extends AbstractBaseEnterpriseClassificationStrategyProvider
{
  protected readonly providerName = "DefaultEnterpriseClassificationStrategyProvider";
  protected readonly providerVersion = "1.0.0-ECSP-ENTERPRISE";

  private readonly registry: IEnterpriseClassificationRegistry = new StandardEnterpriseClassificationRegistryImpl();
  private readonly classificationDefinitions: Map<number, string> = new Map();

  getRegisteredClassificationDivisors(): readonly number[] {
    return Array.from(this.classificationDefinitions.keys());
  }

  registerClassificationDefinition(divisor: number, classification: string): void {
    const existing = this.classificationDefinitions.get(divisor);
    if (existing !== undefined) {
      console.debug(
        `[${this.providerName}:${this.providerVersion}] ` +
        `Overriding existing classification definition for divisor=[${divisor}]: ` +
        `old=[${existing}], new=[${classification}]`,
      );
    }
    this.classificationDefinitions.set(divisor, classification);
  }

  resolveClassificationForValue(value: number): readonly string[] {
    const results: string[] = [];
    const sortedDivisors = Array.from(this.classificationDefinitions.keys()).sort((a, b) => b - a);
    for (const divisor of sortedDivisors) {
      if (value % divisor === 0) {
        const classification = this.classificationDefinitions.get(divisor);
        if (classification !== undefined) {
          results.push(classification);
        }
      }
    }
    return results;
  }

  getClassificationRegistry(): IEnterpriseClassificationRegistry {
    return this.registry;
  }
}

import type { IEnterpriseMessagePropertyConfigurationSource } from "../contracts/IEnterpriseMessagePropertyConfigurationSource.js";

export abstract class AbstractBaseEnterpriseMessagePropertyConfigurationSource implements IEnterpriseMessagePropertyConfigurationSource {
  protected abstract readonly sourceName: string;
  protected abstract readonly sourcePriority: number;

  abstract getPropertyValue(propertyKey: string): string | null;

  getSourceName(): string {
    return this.sourceName;
  }

  getSourcePriority(): number {
    return this.sourcePriority;
  }

  isPropertyResolvable(propertyKey: string): boolean {
    return this.getPropertyValue(propertyKey) !== null;
  }
}

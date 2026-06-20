import { AbstractBaseEnterpriseMessagePropertyConfigurationSource } from "../../abstracts/AbstractBaseEnterpriseMessagePropertyConfigurationSource.js";

export class SystemEnvironmentMessagePropertyConfigurationSourceImpl extends AbstractBaseEnterpriseMessagePropertyConfigurationSource {
  protected override readonly sourceName = "SystemEnvironmentMessagePropertyConfigurationSource";
  protected override readonly sourcePriority = 75;

  private static readonly ENV_PREFIX = "FIZZBUZZ_MESSAGE_";

  override getPropertyValue(propertyKey: string): string | null {
    const envKey = `${SystemEnvironmentMessagePropertyConfigurationSourceImpl.ENV_PREFIX}${propertyKey.replace(/\./g, "_").toUpperCase()}`;
    const envValue = process.env[envKey];
    return envValue !== undefined && envValue !== "" ? envValue : null;
  }
}

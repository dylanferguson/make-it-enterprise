import { AbstractBaseEnterpriseStrategyLookupService } from "../abstracts/AbstractBaseEnterpriseStrategyLookupService.js";

export class DefaultEnterpriseStrategyLookupServiceImpl
  extends AbstractBaseEnterpriseStrategyLookupService
{
  protected readonly lookupServiceName = "DefaultEnterpriseStrategyLookupService";
  protected readonly lookupServiceVersion = "1.0.0-LOOKUP-SERVICE-ENTERPRISE";

  resolveStrategyProvider(strategyName: string, version?: string): object {
    const registration = this.providerRegistry.get(strategyName);
    if (registration === undefined) {
      const requestedVersionDisplay = version !== undefined ? version : "LATEST";
      throw new Error(
        `[${this.lookupServiceName}:${this.lookupServiceVersion}] ` +
        `No strategy provider registered for strategy=[${strategyName}] ` +
        `requestedVersion=[${requestedVersionDisplay}] ` +
        `registeredStrategies=[${this.getRegisteredStrategyNames().join(", ")}]`,
      );
    }
    if (version !== undefined && registration.version !== version) {
      console.debug(
        `[${this.lookupServiceName}:${this.lookupServiceVersion}] ` +
        `Version mismatch for strategy=[${strategyName}]: ` +
        `requested=[${version}], registered=[${registration.version}] – ` +
        `returning registered provider as fallback`,
      );
    }
    return registration.provider;
  }
}

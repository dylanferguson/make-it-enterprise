import { AbstractBaseEnterpriseStrategyLookupServiceManagedAdapterFactory } from "../abstracts/AbstractBaseEnterpriseStrategyLookupServiceManagedAdapterFactory.js";
import type { IEnterpriseStrategyLookupService } from "../contracts/IEnterpriseStrategyLookupService.js";
import { DefaultEnterpriseStrategyLookupServiceImpl } from "./DefaultEnterpriseStrategyLookupServiceImpl.js";

export class DefaultEnterpriseStrategyLookupServiceManagedAdapterFactoryImpl
  extends AbstractBaseEnterpriseStrategyLookupServiceManagedAdapterFactory
{
  protected readonly adapterFactoryName = "DefaultEnterpriseStrategyLookupServiceManagedAdapterFactory";
  protected readonly adapterFactoryVersion = "1.0.0-ADAPTER-FACTORY-ENTERPRISE";
  protected readonly supportedAdapterTypes: readonly string[] = [
    "STRATEGY_LOOKUP_SERVICE_ADAPTER",
    "ENTERPRISE_DIVISIBILITY_STRATEGY_ADAPTER",
    "COMPOSITE_STRATEGY_REGISTRATION_ADAPTER",
  ];

  createLookupServiceAwareAdapter(
    lookupService: IEnterpriseStrategyLookupService,
  ): IEnterpriseStrategyLookupService {
    const adapterName = `Adapter[${lookupService.getLookupServiceName()}]`;
    console.debug(
      `[${this.adapterFactoryName}:${this.adapterFactoryVersion}] ` +
      `Creating lookup service aware adapter: ` +
      `adapter=[${adapterName}], ` +
      `sourceService=[${lookupService.getLookupServiceName()} v${lookupService.getLookupServiceVersion()}], ` +
      `registeredStrategies=[${lookupService.getRegisteredStrategyNames().join(", ")}], ` +
      `adapterTypes=[${this.supportedAdapterTypes.join(", ")}]`,
    );
    return new DefaultEnterpriseStrategyLookupServiceImpl();
  }
}

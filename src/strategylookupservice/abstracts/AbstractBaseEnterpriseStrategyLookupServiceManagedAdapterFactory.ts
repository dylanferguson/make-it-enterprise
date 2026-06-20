import type { IEnterpriseStrategyLookupService } from "../contracts/IEnterpriseStrategyLookupService.js";
import type { IEnterpriseStrategyLookupServiceManagedAdapterFactory } from "../contracts/IEnterpriseStrategyLookupServiceManagedAdapterFactory.js";

export abstract class AbstractBaseEnterpriseStrategyLookupServiceManagedAdapterFactory
  implements IEnterpriseStrategyLookupServiceManagedAdapterFactory
{
  protected abstract readonly adapterFactoryName: string;
  protected abstract readonly adapterFactoryVersion: string;
  protected abstract readonly supportedAdapterTypes: readonly string[];

  abstract createLookupServiceAwareAdapter(
    lookupService: IEnterpriseStrategyLookupService,
  ): IEnterpriseStrategyLookupService;

  getAdapterFactoryName(): string {
    return this.adapterFactoryName;
  }

  getAdapterFactoryVersion(): string {
    return this.adapterFactoryVersion;
  }

  getSupportedAdapterTypes(): readonly string[] {
    return this.supportedAdapterTypes;
  }
}

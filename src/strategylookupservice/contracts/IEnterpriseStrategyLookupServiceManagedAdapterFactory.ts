import type { IEnterpriseStrategyLookupService } from "./IEnterpriseStrategyLookupService.js";

export interface IEnterpriseStrategyLookupServiceManagedAdapterFactory {
  createLookupServiceAwareAdapter(lookupService: IEnterpriseStrategyLookupService): IEnterpriseStrategyLookupService;
  getAdapterFactoryName(): string;
  getAdapterFactoryVersion(): string;
  getSupportedAdapterTypes(): readonly string[];
}

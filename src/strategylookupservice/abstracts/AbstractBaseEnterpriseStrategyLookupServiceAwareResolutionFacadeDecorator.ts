import type { IEnterpriseStrategyLookupService } from "../contracts/IEnterpriseStrategyLookupService.js";
import type { IEnterpriseStrategyLookupServiceAwareResolutionFacadeDecorator } from "../contracts/IEnterpriseStrategyLookupServiceAwareResolutionFacadeDecorator.js";

export abstract class AbstractBaseEnterpriseStrategyLookupServiceAwareResolutionFacadeDecorator
  implements IEnterpriseStrategyLookupServiceAwareResolutionFacadeDecorator
{
  protected abstract readonly decoratorName: string;
  protected abstract readonly decoratorVersion: string;
  protected abstract readonly decoratorEnabled: boolean;
  protected readonly lookupService: IEnterpriseStrategyLookupService;

  constructor(lookupService: IEnterpriseStrategyLookupService) {
    this.lookupService = lookupService;
  }

  abstract resolveValue(value: number): string;
  abstract resolveRange(start: number, end: number): readonly string[];
  abstract getWrappedFacadeName(): string;

  getFacadeName(): string {
    return this.decoratorName;
  }

  getFacadeVersion(): string {
    return this.decoratorVersion;
  }

  getLookupService(): IEnterpriseStrategyLookupService {
    return this.lookupService;
  }

  getDecoratorName(): string {
    return this.decoratorName;
  }

  getDecoratorVersion(): string {
    return this.decoratorVersion;
  }

  isDecoratorEnabled(): boolean {
    return this.decoratorEnabled;
  }

  getLookupServiceRegistrationCount(): number {
    return this.lookupService.getStrategyProviderCount();
  }
}

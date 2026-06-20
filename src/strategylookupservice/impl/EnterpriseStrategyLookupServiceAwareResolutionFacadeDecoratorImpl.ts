import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IEnterpriseStrategyLookupService } from "../contracts/IEnterpriseStrategyLookupService.js";
import { AbstractBaseEnterpriseStrategyLookupServiceAwareResolutionFacadeDecorator } from "../abstracts/AbstractBaseEnterpriseStrategyLookupServiceAwareResolutionFacadeDecorator.js";

export class EnterpriseStrategyLookupServiceAwareResolutionFacadeDecoratorImpl
  extends AbstractBaseEnterpriseStrategyLookupServiceAwareResolutionFacadeDecorator
{
  protected readonly decoratorName = "EnterpriseStrategyLookupServiceAwareResolutionFacadeDecorator";
  protected readonly decoratorVersion = "1.0.0-LOOKUP-SERVICE-AWARE-DECORATOR";
  protected readonly decoratorEnabled = true;

  private readonly wrappedFacade: IFizzBuzzSingleValueResolutionFacade;
  private readonly strategyResolutionCache: Map<string, string> = new Map();
  private resolutionCount: number = 0;
  private cacheHitCount: number = 0;

  constructor(
    wrappedFacade: IFizzBuzzSingleValueResolutionFacade,
    lookupService: IEnterpriseStrategyLookupService,
  ) {
    super(lookupService);
    this.wrappedFacade = wrappedFacade;
  }

  getWrappedFacadeName(): string {
    return this.wrappedFacade.getFacadeName();
  }

  resolveValue(value: number): string {
    this.resolutionCount++;
    const strategyKey = `resolution:${value}`;
    const cached = this.strategyResolutionCache.get(strategyKey);
    if (cached !== undefined) {
      this.cacheHitCount++;
      console.debug(
        `[${this.decoratorName}:${this.decoratorVersion}] ` +
        `Strategy resolution cache hit: key=[${strategyKey}], ` +
        `cacheHitCount=[${this.cacheHitCount}], totalResolutions=[${this.resolutionCount}]`,
      );
      return cached;
    }

    const registeredStrategies = this.lookupService.getRegisteredStrategyNames();
    if (registeredStrategies.length > 0) {
      const activeStrategy: string = registeredStrategies[0]!;
      const provider = this.lookupService.resolveStrategyProvider(activeStrategy);
      console.debug(
        `[${this.decoratorName}:${this.decoratorVersion}] ` +
        `Delegating via strategy lookup service: ` +
        `value=[${value}], activeStrategy=[${activeStrategy}], ` +
        `provider=[${(provider as any).constructor?.name ?? "unknown"}], ` +
        `providerCount=[${this.lookupService.getStrategyProviderCount()}]`,
      );
    }

    const result = this.wrappedFacade.resolveValue(value);
    this.strategyResolutionCache.set(strategyKey, result);
    return result;
  }

  resolveRange(start: number, end: number): readonly string[] {
    const results: string[] = [];
    for (let i = start; i <= end; i++) {
      results.push(this.resolveValue(i));
    }
    return results;
  }

  override getFacadeName(): string {
    return this.decoratorName;
  }

  override getFacadeVersion(): string {
    return this.decoratorVersion;
  }

  getResolutionCount(): number {
    return this.resolutionCount;
  }

  getCacheHitCount(): number {
    return this.cacheHitCount;
  }
}

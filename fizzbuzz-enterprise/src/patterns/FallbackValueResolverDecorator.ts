import type { ICompositeValueResolver } from "../contracts/ICompositeValueResolver.js";

export class FallbackValueResolverDecorator implements ICompositeValueResolver {
  private readonly primary: ICompositeValueResolver;
  private readonly fallback: ICompositeValueResolver;
  private fallbackTriggeredCount: number = 0;

  constructor(primary: ICompositeValueResolver, fallback: ICompositeValueResolver) {
    this.primary = primary;
    this.fallback = fallback;
  }

  resolve(value: number): string {
    try {
      return this.primary.resolve(value);
    } catch (primaryError) {
      console.debug(
        `[FallbackDecorator] Primary resolver failed for value ${value}: ${primaryError instanceof Error ? primaryError.message : String(primaryError)}. Delegating to fallback.`,
      );
      this.fallbackTriggeredCount++;
      return this.fallback.resolve(value);
    }
  }

  getFallbackTriggeredCount(): number {
    return this.fallbackTriggeredCount;
  }
}

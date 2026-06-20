import type { ICompositeValueResolver } from "../contracts/ICompositeValueResolver.js";

export class RetryValueResolverDecorator implements ICompositeValueResolver {
  private readonly decorated: ICompositeValueResolver;
  private readonly maxRetries: number;
  private readonly retryDelayMs: number;

  constructor(
    decorated: ICompositeValueResolver,
    maxRetries: number = 3,
    retryDelayMs: number = 0,
  ) {
    this.decorated = decorated;
    this.maxRetries = maxRetries;
    this.retryDelayMs = retryDelayMs;
  }

  resolve(value: number): string {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        return this.decorated.resolve(value);
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        console.debug(
          `[RetryDecorator] Attempt ${attempt}/${this.maxRetries} failed for value ${value}: ${lastError.message}`,
        );
        if (attempt < this.maxRetries && this.retryDelayMs > 0) {
          this.sleep(this.retryDelayMs);
        }
      }
    }

    throw lastError ?? new Error(`[RetryDecorator] All ${this.maxRetries} attempts failed for value ${value}`);
  }

  private sleep(ms: number): void {
    const start = Date.now();
    while (Date.now() - start < ms) {
    }
  }

  getMaxRetries(): number {
    return this.maxRetries;
  }
}

import type { ICompositeValueResolver } from "../contracts/ICompositeValueResolver.js";

export class LoggingValueResolverDecorator implements ICompositeValueResolver {
  private readonly decorated: ICompositeValueResolver;

  constructor(decorated: ICompositeValueResolver) {
    this.decorated = decorated;
  }

  resolve(value: number): string {
    const result = this.decorated.resolve(value);
    console.debug(`[FizzBuzzValueResolver] Resolved value ${value} to "${result}"`);
    return result;
  }
}

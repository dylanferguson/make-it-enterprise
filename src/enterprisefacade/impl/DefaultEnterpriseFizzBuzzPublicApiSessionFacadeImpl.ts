import { AbstractBaseEnterpriseFizzBuzzPublicApiSessionFacadeImpl } from "../abstracts/AbstractBaseEnterpriseFizzBuzzPublicApiSessionFacadeImpl.js";

export class DefaultEnterpriseFizzBuzzPublicApiSessionFacadeImpl
  extends AbstractBaseEnterpriseFizzBuzzPublicApiSessionFacadeImpl
{
  private readonly _singleValueResolver: (value: number) => string;
  private readonly _rangeResolver: (start: number, end: number) => readonly string[];

  constructor(
    singleValueResolver: (value: number) => string,
    rangeResolver: (start: number, end: number) => readonly string[],
  ) {
    super();
    this._singleValueResolver = singleValueResolver;
    this._rangeResolver = rangeResolver;
  }

  getFacadeName(): string {
    return "DefaultEnterpriseFizzBuzzPublicApiSessionFacade";
  }

  getFacadeVersion(): string {
    return "1.0.0-FACADE";
  }

  resolveSingleValue(value: number): string {
    console.debug(
      `[PublicApiSessionFacade] Resolving single value: value=[${value}], ` +
      `session=[${this.getSessionId()}], resolutionCount=[${this.getResolutionCount()}]`,
    );
    this.incrementResolutionCount();
    return this._singleValueResolver(value);
  }

  resolveRange(start: number, end: number): readonly string[] {
    console.debug(
      `[PublicApiSessionFacade] Resolving range: start=[${start}], end=[${end}], ` +
      `session=[${this.getSessionId()}]`,
    );
    return this._rangeResolver(start, end);
  }
}

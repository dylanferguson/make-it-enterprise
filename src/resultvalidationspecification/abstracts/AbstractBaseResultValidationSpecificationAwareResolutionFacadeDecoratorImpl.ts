import type { IResultValidationSpecificationAwareResolutionFacadeDecorator } from "../contracts/IResultValidationSpecificationAwareResolutionFacadeDecorator.js";
import type { IEnterpriseFizzBuzzResultValidationSpecificationRegistry } from "../contracts/IEnterpriseFizzBuzzResultValidationSpecificationRegistry.js";
import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";

export abstract class AbstractBaseResultValidationSpecificationAwareResolutionFacadeDecoratorImpl
  implements IResultValidationSpecificationAwareResolutionFacadeDecorator
{
  private readonly _decoratorName: string;
  private readonly _decoratorVersion: string;
  private readonly _wrappedFacade: IFizzBuzzSingleValueResolutionFacade;
  private readonly _validationRegistry: IEnterpriseFizzBuzzResultValidationSpecificationRegistry;
  private _totalValidated: number = 0;
  private _totalFailures: number = 0;
  private _lastFailures: readonly string[] = [];
  private _enabled: boolean;

  constructor(
    decoratorName: string,
    decoratorVersion: string,
    wrappedFacade: IFizzBuzzSingleValueResolutionFacade,
    validationRegistry: IEnterpriseFizzBuzzResultValidationSpecificationRegistry,
    enabled: boolean,
  ) {
    this._decoratorName = decoratorName;
    this._decoratorVersion = decoratorVersion;
    this._wrappedFacade = wrappedFacade;
    this._validationRegistry = validationRegistry;
    this._enabled = enabled;
  }

  getDecoratorName(): string {
    return this._decoratorName;
  }

  getDecoratorVersion(): string {
    return this._decoratorVersion;
  }

  getWrappedFacadeName(): string {
    return this._wrappedFacade.getFacadeName();
  }

  getValidationRegistry(): IEnterpriseFizzBuzzResultValidationSpecificationRegistry {
    return this._validationRegistry;
  }

  getTotalValidatedCount(): number {
    return this._totalValidated;
  }

  getTotalValidationFailureCount(): number {
    return this._totalFailures;
  }

  getLastValidationFailures(): readonly string[] {
    return this._lastFailures;
  }

  isDecoratorEnabled(): boolean {
    return this._enabled;
  }

  getDecoratorDiagnosticSummary(): string {
    return `${this._decoratorName} v${this._decoratorVersion}: validated=${this._totalValidated}, failures=${this._totalFailures}, enabled=${this._enabled}, registry=[${this._validationRegistry.getRegistryName()}], registeredSpecs=[${this._validationRegistry.getRegisteredSpecificationCount()}]`;
  }

  setDecoratorEnabled(enabled: boolean): void {
    this._enabled = enabled;
  }

  protected performValidation(value: number, computedResult: string): string {
    if (this._enabled && this._validationRegistry.isRegistryActive()) {
      const validation = this._validationRegistry.validateResult(value, computedResult);
      this._totalValidated++;
      if (!validation.valid) {
        this._totalFailures++;
        this._lastFailures = validation.failures;
      } else {
        this._lastFailures = [];
      }
    }
    return computedResult;
  }

  protected getWrappedFacade(): IFizzBuzzSingleValueResolutionFacade {
    return this._wrappedFacade;
  }

  resolveRange(start: number, end: number): readonly string[] {
    return this._wrappedFacade.resolveRange(start, end);
  }

  abstract getFacadeName(): string;
  abstract getFacadeVersion(): string;
  abstract resolveValue(value: number): string;
}

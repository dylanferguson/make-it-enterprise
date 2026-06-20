import type {
  IEnterpriseClassificationAwareResolutionFacadeDecorator,
  IEnterpriseClassificationStrategyProvider,
  IEnterpriseClassificationVisitor,
} from "../contracts/index.js";
import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";

export abstract class AbstractBaseEnterpriseClassificationAwareResolutionFacadeDecorator
  implements IEnterpriseClassificationAwareResolutionFacadeDecorator
{
  protected abstract readonly decoratorName: string;
  protected abstract readonly decoratorVersion: string;
  protected abstract readonly decoratorEnabled: boolean;

  protected readonly wrappedFacade: IFizzBuzzSingleValueResolutionFacade;
  protected readonly classificationStrategyProvider: IEnterpriseClassificationStrategyProvider;
  protected readonly classificationVisitor: IEnterpriseClassificationVisitor;

  private static readonly FACADE_CONTEXT_PREFIX = "class:aware:dec";

  constructor(
    wrappedFacade: IFizzBuzzSingleValueResolutionFacade,
    classificationStrategyProvider: IEnterpriseClassificationStrategyProvider,
    classificationVisitor: IEnterpriseClassificationVisitor,
  ) {
    this.wrappedFacade = wrappedFacade;
    this.classificationStrategyProvider = classificationStrategyProvider;
    this.classificationVisitor = classificationVisitor;
  }

  abstract resolveValue(value: number): string;

  abstract resolveRange(start: number, end: number): readonly string[];

  abstract getFacadeName(): string;
  abstract getFacadeVersion(): string;

  abstract resolveWithClassification(value: number): string;

  getDecoratorName(): string {
    return this.decoratorName;
  }

  getDecoratorVersion(): string {
    return this.decoratorVersion;
  }

  isDecoratorEnabled(): boolean {
    return this.decoratorEnabled;
  }

  getWrappedFacadeName(): string {
    return this.wrappedFacade.getFacadeName();
  }

  getClassificationStrategyProvider(): IEnterpriseClassificationStrategyProvider {
    return this.classificationStrategyProvider;
  }

  getClassificationVisitor(): IEnterpriseClassificationVisitor {
    return this.classificationVisitor;
  }

  protected buildClassificationContext(value: number): string {
    return `${AbstractBaseEnterpriseClassificationAwareResolutionFacadeDecorator.FACADE_CONTEXT_PREFIX}:${value}:${Date.now()}`;
  }

  protected assertFiniteValue(value: number): void {
    if (!Number.isFinite(value)) {
      throw new Error(
        `[${this.decoratorName} v${this.decoratorVersion}] ` +
        `Resolution value must be finite, received: ${value}`,
      );
    }
  }
}

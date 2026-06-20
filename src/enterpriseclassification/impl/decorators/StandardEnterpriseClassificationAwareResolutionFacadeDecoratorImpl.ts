import { AbstractBaseEnterpriseClassificationAwareResolutionFacadeDecorator } from "../../abstracts/AbstractBaseEnterpriseClassificationAwareResolutionFacadeDecorator.js";
import type { IFizzBuzzSingleValueResolutionFacade } from "../../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IEnterpriseClassificationStrategyProvider } from "../../contracts/index.js";
import type { IEnterpriseClassificationVisitor } from "../../contracts/index.js";

export class StandardEnterpriseClassificationAwareResolutionFacadeDecoratorImpl
  extends AbstractBaseEnterpriseClassificationAwareResolutionFacadeDecorator
{
  protected readonly decoratorName = "StandardEnterpriseClassificationAwareResolutionFacadeDecorator";
  protected readonly decoratorVersion = "1.0.0-ECARD-ENTERPRISE";
  protected readonly decoratorEnabled = true;

  private classificationEvaluationCount: number = 0;

  constructor(
    wrappedFacade: IFizzBuzzSingleValueResolutionFacade,
    classificationStrategyProvider: IEnterpriseClassificationStrategyProvider,
    classificationVisitor: IEnterpriseClassificationVisitor,
  ) {
    super(wrappedFacade, classificationStrategyProvider, classificationVisitor);
  }

  override resolveValue(value: number): string {
    this.assertFiniteValue(value);
    this.classificationEvaluationCount++;
    const context = this.buildClassificationContext(value);
    const registeredDivisors = this.classificationStrategyProvider.getRegisteredClassificationDivisors();
    console.debug(
      `[${this.decoratorName} v${this.decoratorVersion}] ` +
      `Resolving value=[${value}] via classification-aware decorator [context=${context}]: ` +
      `registeredDivisors=[${registeredDivisors.join(", ")}], ` +
      `evaluationCount=[${this.classificationEvaluationCount}]`,
    );
    if (registeredDivisors.length > 0) {
      const classifications = this.classificationStrategyProvider.resolveClassificationForValue(value);
      if (classifications.length > 0) {
        return this.classificationVisitor.visitCollection(value, classifications);
      }
    }
    return this.classificationVisitor.getAggregatedClassification(value);
  }

  override resolveWithClassification(value: number): string {
    return this.resolveValue(value);
  }

  override resolveRange(start: number, end: number): readonly string[] {
    this.assertFiniteValue(start);
    this.assertFiniteValue(end);
    if (end < start) {
      throw new Error(
        `[${this.decoratorName} v${this.decoratorVersion}] ` +
        `Range end [${end}] must be >= start [${start}]`,
      );
    }
    const results: string[] = [];
    for (let i = start; i <= end; i++) {
      results.push(this.resolveValue(i));
    }
    return results;
  }

  override getFacadeName(): string {
    return `${this.decoratorName}::${this.wrappedFacade.getFacadeName()}`;
  }

  override getFacadeVersion(): string {
    return this.decoratorVersion;
  }

  getClassificationEvaluationCount(): number {
    return this.classificationEvaluationCount;
  }
}

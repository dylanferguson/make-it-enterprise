import { AbstractBaseDivisibilityEvaluationSupervisionChainLink } from "../../abstracts/AbstractBaseDivisibilityEvaluationSupervisionChainLink.js";
import type { IDivisibilityEvaluationSupervisionChainLink } from "../../contracts/IDivisibilityEvaluationSupervisionChainLink.js";
import type { IValidationEnforcementMetricsCollector } from "../../contracts/IValidationEnforcementMetricsCollector.js";
import { DefaultValidationEnforcementMetricsCollectorImpl } from "../validation/DefaultValidationEnforcementMetricsCollectorImpl.js";

export class MetricsCollectingDivisibilityEvaluationSupervisionChainDecoratorImpl
  extends AbstractBaseDivisibilityEvaluationSupervisionChainLink
  implements IDivisibilityEvaluationSupervisionChainLink
{
  private static readonly LINK_NAME = "MetricsCollectingDivisibilityEvaluationSupervisionChainDecorator";
  private static readonly LINK_PRIORITY = 25;
  private readonly wrappedLink: IDivisibilityEvaluationSupervisionChainLink;
  private readonly metricsCollector: IValidationEnforcementMetricsCollector;
  private evaluationCount: number = 0;
  private trueCount: number = 0;

  constructor(
    wrappedLink: IDivisibilityEvaluationSupervisionChainLink,
    metricsCollector?: IValidationEnforcementMetricsCollector,
  ) {
    super();
    this.wrappedLink = wrappedLink;
    this.metricsCollector = metricsCollector ?? new DefaultValidationEnforcementMetricsCollectorImpl();
  }

  override evaluateDivisibility(dividend: number, divisor: number): boolean {
    this.evaluationCount++;
    const result = this.wrappedLink.evaluateDivisibility(dividend, divisor);
    if (result) {
      this.trueCount++;
    }
    const hitRatio = this.evaluationCount > 0
      ? ((this.trueCount / this.evaluationCount) * 100).toFixed(2)
      : "0.00";
    console.debug(
      `[${MetricsCollectingDivisibilityEvaluationSupervisionChainDecoratorImpl.LINK_NAME}] ` +
      `metricsCollector=[${this.metricsCollector.getMetricsCollectorName()}], ` +
      `evaluations=${this.evaluationCount}, trueResults=${this.trueCount}, hitRatio=${hitRatio}%`,
    );
    if (!result) {
      return this.proceedToNext(dividend, divisor);
    }
    return result;
  }

  getEvaluationCount(): number {
    return this.evaluationCount;
  }

  getTrueResultCount(): number {
    return this.trueCount;
  }

  resetMetrics(): void {
    this.evaluationCount = 0;
    this.trueCount = 0;
  }

  override getLinkName(): string {
    return MetricsCollectingDivisibilityEvaluationSupervisionChainDecoratorImpl.LINK_NAME;
  }

  override getLinkPriority(): number {
    return MetricsCollectingDivisibilityEvaluationSupervisionChainDecoratorImpl.LINK_PRIORITY;
  }
}

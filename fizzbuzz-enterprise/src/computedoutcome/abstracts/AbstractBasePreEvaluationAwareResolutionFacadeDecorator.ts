import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IEnterpriseComputedOutcomePreEvaluationCommandChain } from "../contracts/index.js";
import type { IEnterpriseComputedOutcomePreEvaluationCommandRegistry } from "../contracts/index.js";
import type { IPreEvaluationAwareResolutionFacadeDecorator } from "../contracts/index.js";

export abstract class AbstractBasePreEvaluationAwareResolutionFacadeDecorator
  implements IPreEvaluationAwareResolutionFacadeDecorator
{
  private static readonly DECORATOR_FRAMEWORK_VERSION = "1.0.0-PRE-EVALUATION-DECORATOR-FRAMEWORK";

  protected readonly decoratedFacade: IFizzBuzzSingleValueResolutionFacade;
  protected readonly preEvaluationCommandChain: IEnterpriseComputedOutcomePreEvaluationCommandChain;
  protected readonly preEvaluationCommandRegistry: IEnterpriseComputedOutcomePreEvaluationCommandRegistry;
  protected preEvaluationEnabled: boolean = true;

  constructor(
    decoratedFacade: IFizzBuzzSingleValueResolutionFacade,
    preEvaluationCommandChain: IEnterpriseComputedOutcomePreEvaluationCommandChain,
    preEvaluationCommandRegistry: IEnterpriseComputedOutcomePreEvaluationCommandRegistry,
  ) {
    this.decoratedFacade = decoratedFacade;
    this.preEvaluationCommandChain = preEvaluationCommandChain;
    this.preEvaluationCommandRegistry = preEvaluationCommandRegistry;
  }

  abstract resolveValue(value: number): string;
  abstract resolveRange(start: number, end: number): readonly string[];
  abstract getFacadeName(): string;
  abstract getFacadeVersion(): string;
  abstract getDecoratorName(): string;
  abstract getDecoratorVersion(): string;

  getDecoratedFacade(): IFizzBuzzSingleValueResolutionFacade {
    return this.decoratedFacade;
  }

  getPreEvaluationCommandChain(): IEnterpriseComputedOutcomePreEvaluationCommandChain {
    return this.preEvaluationCommandChain;
  }

  getPreEvaluationCommandRegistry(): IEnterpriseComputedOutcomePreEvaluationCommandRegistry {
    return this.preEvaluationCommandRegistry;
  }

  isPreEvaluationEnabled(): boolean {
    return this.preEvaluationEnabled;
  }

  setPreEvaluationEnabled(enabled: boolean): void {
    this.preEvaluationEnabled = enabled;
  }

  protected getDecoratorFrameworkVersion(): string {
    return AbstractBasePreEvaluationAwareResolutionFacadeDecorator.DECORATOR_FRAMEWORK_VERSION;
  }

  protected assertValidValue(value: number): void {
    if (!Number.isFinite(value)) {
      throw new Error(
        `[${this.getDecoratorName()} v${this.getDecoratorVersion()}] ` +
        `Invalid pre-evaluation value: ${value}`,
      );
    }
  }
}

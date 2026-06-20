import type { IEnterpriseDivisibilityOrchestrationTemplateMethod } from "../contracts/IEnterpriseDivisibilityOrchestrationTemplateMethod.js";
import type { IEnterpriseDivisibilityOrchestrationBridgeImplementor } from "../contracts/IEnterpriseDivisibilityOrchestrationBridgeImplementor.js";

export abstract class AbstractBaseEnterpriseDivisibilityOrchestrationTemplateMethod
  implements IEnterpriseDivisibilityOrchestrationTemplateMethod
{
  private readonly templateMethodName: string;
  private readonly templateMethodVersion: string;
  private bridgeImplementor: IEnterpriseDivisibilityOrchestrationBridgeImplementor | null = null;

  constructor(templateMethodName: string, templateMethodVersion: string) {
    this.templateMethodName = templateMethodName;
    this.templateMethodVersion = templateMethodVersion;
  }

  getTemplateMethodName(): string {
    return this.templateMethodName;
  }

  getTemplateMethodVersion(): string {
    return this.templateMethodVersion;
  }

  setBridgeImplementor(implementor: IEnterpriseDivisibilityOrchestrationBridgeImplementor): void {
    this.bridgeImplementor = implementor;
  }

  getBridgeImplementor(): IEnterpriseDivisibilityOrchestrationBridgeImplementor | null {
    return this.bridgeImplementor;
  }

  evaluateDivisibility(dividend: number, divisor: number): boolean {
    const implementor = this.bridgeImplementor;
    if (implementor === null) {
      throw new Error(
        `[${this.templateMethodName}] No bridge implementor registered. ` +
        `Cannot evaluate divisibility without a concrete remainder computation strategy. ` +
        `Ensure setBridgeImplementor() is called before evaluateDivisibility().`,
      );
    }
    this.preEvaluationHook(dividend, divisor);
    const remainder = implementor.computeRemainder(dividend, divisor);
    const result = remainder === 0;
    this.postEvaluationHook(dividend, divisor, remainder, result);
    return result;
  }

  protected preEvaluationHook(_dividend: number, _divisor: number): void {
  }

  protected postEvaluationHook(
    _dividend: number,
    _divisor: number,
    _remainder: number,
    _result: boolean,
  ): void {
  }
}

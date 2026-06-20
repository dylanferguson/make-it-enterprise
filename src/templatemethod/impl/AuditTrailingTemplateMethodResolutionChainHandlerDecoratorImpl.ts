import type { IEnterpriseFizzBuzzTemplateMethodResolutionChainHandler } from "../contracts/IEnterpriseFizzBuzzTemplateMethodResolutionChainHandler.js";
import { AbstractBaseEnterpriseFizzBuzzTemplateMethodResolutionChainHandlerDecorator } from "../abstracts/AbstractBaseEnterpriseFizzBuzzTemplateMethodResolutionChainHandlerDecorator.js";

export class AuditTrailingTemplateMethodResolutionChainHandlerDecoratorImpl
  extends AbstractBaseEnterpriseFizzBuzzTemplateMethodResolutionChainHandlerDecorator
{
  private static readonly DECORATOR_NAME = "AuditTrailingTemplateMethodResolutionChainHandlerDecorator";
  private static readonly DECORATOR_VERSION = "1.0.0-AUDIT-TRAIL-DECORATOR";

  private invocationCount: number = 0;

  constructor(decoratedHandler: IEnterpriseFizzBuzzTemplateMethodResolutionChainHandler) {
    super(decoratedHandler);
  }

  override getDecoratorName(): string {
    return AuditTrailingTemplateMethodResolutionChainHandlerDecoratorImpl.DECORATOR_NAME;
  }

  override getDecoratorVersion(): string {
    return AuditTrailingTemplateMethodResolutionChainHandlerDecoratorImpl.DECORATOR_VERSION;
  }

  protected override doExecuteDecorated(
    value: number,
    innerResolver: (value: number) => string,
    templateContext: string | null,
  ): string {
    this.invocationCount++;
    const invocationId = `AUDIT-${this.invocationCount}-${Date.now()}`;
    console.debug(
      `[${this.getDecoratorName()}] Audit trail entry #${this.invocationCount}: ` +
      `value=${value}, context=${templateContext ?? "NONE"}, id=${invocationId}`,
    );
    const result = this.decoratedHandler.executeTemplateResolution(value, innerResolver, templateContext);
    console.debug(
      `[${this.getDecoratorName()}] Audit trail result #${this.invocationCount}: ` +
      `value=${value} => "${result}"`,
    );
    return result;
  }
}

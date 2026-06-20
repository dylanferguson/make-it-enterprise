import type { IFizzBuzzResolutionStrategyChainOfResponsibilityHandler } from "../../../contracts/IFizzBuzzResolutionStrategyChainOfResponsibilityHandler.js";
import type { IEnterpriseFizzBuzzTemplateMethodResolutionChainHandler } from "../../../templatemethod/contracts/IEnterpriseFizzBuzzTemplateMethodResolutionChainHandler.js";
import type { IEnterpriseFizzBuzzResolutionAuditTrailVisitor } from "../../../visitortrail/contracts/IEnterpriseFizzBuzzResolutionAuditTrailVisitor.js";
import { AbstractBaseFizzBuzzResolutionStrategyChainOfResponsibilityHandler } from "../../../abstracts/AbstractBaseFizzBuzzResolutionStrategyChainOfResponsibilityHandler.js";

export class TemplateMethodSpecificationDrivenChainHandlerImpl
  extends AbstractBaseFizzBuzzResolutionStrategyChainOfResponsibilityHandler
  implements IFizzBuzzResolutionStrategyChainOfResponsibilityHandler
{
  private static readonly HANDLER_NAME = "TemplateMethodSpecificationDrivenChainHandler";
  private static readonly HANDLER_PRIORITY = 90;

  private readonly templateMethodHandler: IEnterpriseFizzBuzzTemplateMethodResolutionChainHandler;
  private readonly auditTrailVisitor: IEnterpriseFizzBuzzResolutionAuditTrailVisitor;
  private readonly decoratedTemplateMethodHandler: IEnterpriseFizzBuzzTemplateMethodResolutionChainHandler;

  constructor(
    templateMethodHandler: IEnterpriseFizzBuzzTemplateMethodResolutionChainHandler,
    auditTrailVisitor: IEnterpriseFizzBuzzResolutionAuditTrailVisitor,
    decoratedTemplateMethodHandler: IEnterpriseFizzBuzzTemplateMethodResolutionChainHandler,
  ) {
    super();
    this.templateMethodHandler = templateMethodHandler;
    this.auditTrailVisitor = auditTrailVisitor;
    this.decoratedTemplateMethodHandler = decoratedTemplateMethodHandler;
  }

  override canHandle(value: number): boolean {
    return Number.isFinite(value) && value >= 0;
  }

  override handleResolution(
    value: number,
    innerResolver: (value: number) => string,
    context: string | null,
  ): string | null {
    const templateContext = `template-method-bridge:${context ?? "default"}`;
    const strategyName = this.auditTrailVisitor.getVisitorName();
    const result = this.decoratedTemplateMethodHandler.executeTemplateResolution(
      value,
      innerResolver,
      templateContext,
    );
    this.auditTrailVisitor.visitResolution(value, strategyName, result);
    return result;
  }

  override getHandlerName(): string {
    return TemplateMethodSpecificationDrivenChainHandlerImpl.HANDLER_NAME;
  }

  override getHandlerPriority(): number {
    return TemplateMethodSpecificationDrivenChainHandlerImpl.HANDLER_PRIORITY;
  }

  getTemplateMethodHandler(): IEnterpriseFizzBuzzTemplateMethodResolutionChainHandler {
    return this.templateMethodHandler;
  }
}

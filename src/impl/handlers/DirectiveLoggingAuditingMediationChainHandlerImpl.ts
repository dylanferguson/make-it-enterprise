import { AbstractBaseEnterpriseFizzBuzzDirectiveResolutionMediationChainHandler } from "../../abstracts/AbstractBaseEnterpriseFizzBuzzDirectiveResolutionMediationChainHandler.js";
import type { IEnterpriseFizzBuzzResolutionDirective } from "../../contracts/IEnterpriseFizzBuzzResolutionDirective.js";

export class DirectiveLoggingAuditingMediationChainHandlerImpl
  extends AbstractBaseEnterpriseFizzBuzzDirectiveResolutionMediationChainHandler
{
  private static readonly HANDLER_NAME = "DirectiveLoggingAuditingMediationChainHandler";
  private static readonly HANDLER_PRIORITY = 300;

  constructor() {
    super(
      DirectiveLoggingAuditingMediationChainHandlerImpl.HANDLER_NAME,
      DirectiveLoggingAuditingMediationChainHandlerImpl.HANDLER_PRIORITY,
    );
  }

  override handleDirectiveResolution(
    directive: IEnterpriseFizzBuzzResolutionDirective,
    innerResolver: (value: number) => string,
  ): string {
    directive.addDirectiveMetadata("chainHandler", this.handlerName);
    directive.addDirectiveMetadata("chainEntryTimestamp", new Date().toISOString());
    return this.proceedToNext(directive, innerResolver);
  }

  override handleRangeDirectiveResolution(
    directive: IEnterpriseFizzBuzzResolutionDirective,
    innerResolver: (value: number) => string,
    start: number,
    end: number,
  ): readonly string[] {
    directive.addDirectiveMetadata("chainHandler", this.handlerName);
    directive.addDirectiveMetadata("chainEntryTimestamp", new Date().toISOString());
    return this.proceedToNextRange(directive, innerResolver, start, end);
  }
}

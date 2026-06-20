import { AbstractBaseEnterpriseFizzBuzzResolutionDirective } from "../../abstracts/AbstractBaseEnterpriseFizzBuzzResolutionDirective.js";

export class SingleValueEnterpriseFizzBuzzResolutionDirectiveImpl extends AbstractBaseEnterpriseFizzBuzzResolutionDirective {
  private static readonly SINGLE_VALUE_DIRECTIVE_DESCRIPTOR = "SINGLE_VALUE";

  constructor(
    directiveId: string,
    directiveValue: number,
    directiveOrigin: string,
    directiveType: string = SingleValueEnterpriseFizzBuzzResolutionDirectiveImpl.SINGLE_VALUE_DIRECTIVE_DESCRIPTOR,
  ) {
    super(directiveId, directiveValue, directiveOrigin, directiveType, false);
  }

  isSingleValueDirective(): boolean {
    return true;
  }

  isRangeDirective(): boolean {
    return false;
  }

  toDirectivePayload(): Record<string, unknown> {
    return {
      directiveId: this.directiveId,
      directiveValue: this.directiveValue,
      directiveOrigin: this.directiveOrigin,
      directiveTimestamp: this.directiveTimestamp.toISOString(),
      directiveType: this.directiveType,
      isRange: false,
      metadata: this.getAllDirectiveMetadata(),
    };
  }
}

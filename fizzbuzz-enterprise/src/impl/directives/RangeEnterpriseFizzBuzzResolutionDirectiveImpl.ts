import { AbstractBaseEnterpriseFizzBuzzResolutionDirective } from "../../abstracts/AbstractBaseEnterpriseFizzBuzzResolutionDirective.js";

export class RangeEnterpriseFizzBuzzResolutionDirectiveImpl extends AbstractBaseEnterpriseFizzBuzzResolutionDirective {
  private static readonly RANGE_DIRECTIVE_DESCRIPTOR = "RANGE";
  private static readonly RANGE_REPRESENTATIVE_VALUE = 0;

  constructor(
    directiveId: string,
    directiveOrigin: string,
    directiveType: string = RangeEnterpriseFizzBuzzResolutionDirectiveImpl.RANGE_DIRECTIVE_DESCRIPTOR,
    private readonly rangeStartValue: number,
    private readonly rangeEndValue: number,
  ) {
    super(
      directiveId,
      RangeEnterpriseFizzBuzzResolutionDirectiveImpl.RANGE_REPRESENTATIVE_VALUE,
      directiveOrigin,
      directiveType,
      true,
      rangeStartValue,
      rangeEndValue,
    );
  }

  isSingleValueDirective(): boolean {
    return false;
  }

  isRangeDirective(): boolean {
    return true;
  }

  toDirectivePayload(): Record<string, unknown> {
    return {
      directiveId: this.directiveId,
      rangeStart: this.rangeStartValue,
      rangeEnd: this.rangeEndValue,
      directiveOrigin: this.directiveOrigin,
      directiveTimestamp: this.directiveTimestamp.toISOString(),
      directiveType: this.directiveType,
      isRange: true,
      metadata: this.getAllDirectiveMetadata(),
    };
  }
}

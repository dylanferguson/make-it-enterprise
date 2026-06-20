import type { IEnterpriseFizzBuzzResolutionDirective } from "../contracts/IEnterpriseFizzBuzzResolutionDirective.js";

export abstract class AbstractBaseEnterpriseFizzBuzzResolutionDirective
  implements IEnterpriseFizzBuzzResolutionDirective
{
  private static readonly DIRECTIVE_FRAMEWORK_VERSION = "1.0.0-RESOLUTION-DIRECTIVE-FRAMEWORK";

  protected readonly directiveId: string;
  protected readonly directiveValue: number;
  protected readonly directiveOrigin: string;
  protected readonly directiveTimestamp: Date;
  protected readonly metadata: Map<string, string>;
  protected directiveType: string;
  protected readonly rangeStart: number;
  protected readonly rangeEnd: number;
  protected readonly isRange: boolean;

  constructor(
    directiveId: string,
    directiveValue: number,
    directiveOrigin: string,
    directiveType: string,
    isRange: boolean,
    rangeStart: number = 0,
    rangeEnd: number = 0,
  ) {
    this.directiveId = directiveId;
    this.directiveValue = directiveValue;
    this.directiveOrigin = directiveOrigin;
    this.directiveTimestamp = new Date();
    this.directiveType = directiveType;
    this.isRange = isRange;
    this.rangeStart = rangeStart;
    this.rangeEnd = rangeEnd;
    this.metadata = new Map();
  }

  abstract isSingleValueDirective(): boolean;
  abstract isRangeDirective(): boolean;
  abstract toDirectivePayload(): Record<string, unknown>;

  getDirectiveId(): string {
    return this.directiveId;
  }

  getDirectiveValue(): number {
    return this.directiveValue;
  }

  getDirectiveOrigin(): string {
    return this.directiveOrigin;
  }

  getDirectiveTimestamp(): Date {
    return this.directiveTimestamp;
  }

  getDirectiveType(): string {
    return this.directiveType;
  }

  setDirectiveType(type: string): void {
    this.directiveType = type;
  }

  addDirectiveMetadata(key: string, value: string): void {
    this.metadata.set(key, value);
  }

  getDirectiveMetadata(key: string): string | undefined {
    return this.metadata.get(key);
  }

  getAllDirectiveMetadata(): Record<string, string> {
    const result: Record<string, string> = {};
    for (const [key, value] of this.metadata.entries()) {
      result[key] = value;
    }
    return result;
  }

  getRangeStart(): number {
    return this.rangeStart;
  }

  getRangeEnd(): number {
    return this.rangeEnd;
  }

  protected getDirectiveFrameworkVersion(): string {
    return AbstractBaseEnterpriseFizzBuzzResolutionDirective.DIRECTIVE_FRAMEWORK_VERSION;
  }
}

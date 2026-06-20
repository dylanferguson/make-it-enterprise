export interface IEnterpriseFizzBuzzResolutionDirective {
  getDirectiveId(): string;
  getDirectiveValue(): number;
  getDirectiveOrigin(): string;
  getDirectiveTimestamp(): Date;
  getDirectiveType(): string;
  setDirectiveType(type: string): void;
  addDirectiveMetadata(key: string, value: string): void;
  getDirectiveMetadata(key: string): string | undefined;
  getAllDirectiveMetadata(): Record<string, string>;
  isRangeDirective(): boolean;
  isSingleValueDirective(): boolean;
  toDirectivePayload(): Record<string, unknown>;
}

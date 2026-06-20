export interface IEnterpriseFizzBuzzPublicApiResolutionDelegate {
  getDelegateName(): string;
  getDelegateVersion(): string;
  getDelegateType(): string;
  resolveSingleValue(value: number): string;
  resolveRange(start: number, end: number): readonly string[];
  isDelegateInitialized(): boolean;
  getDelegateStatusSummary(): string;
}

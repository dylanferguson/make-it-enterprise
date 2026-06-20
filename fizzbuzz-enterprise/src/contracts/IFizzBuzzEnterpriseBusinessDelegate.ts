export interface IFizzBuzzEnterpriseBusinessDelegate {
  delegateSingleValueResolution(value: number): string;
  delegateRangeResolution(start: number, end: number): readonly string[];
  getDelegateName(): string;
  getDelegateVersion(): string;
  getDelegateImplementationVendor(): string;
  isDelegateInitialized(): boolean;
  getDelegateContextSummary(): string;
}

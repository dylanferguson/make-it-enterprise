export interface IFizzBuzzComputedOutcomeTransferObject {
  getPrimaryKey(): number;
  getComputedValue(): string;
  getInputValue(): number;
  getResolutionTimestamp(): number;
  getTransferObjectName(): string;
  getTransferObjectVersion(): string;
  toDiagnosticString(): string;
}

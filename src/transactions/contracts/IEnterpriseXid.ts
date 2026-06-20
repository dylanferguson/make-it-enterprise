export interface IEnterpriseXid {
  getFormatId(): number;
  getGlobalTransactionId(): Uint8Array;
  getBranchQualifier(): Uint8Array;
  getXidString(): string;
}

import type { IEnterpriseXid } from "../contracts/IEnterpriseXid.js";

export abstract class AbstractBaseEnterpriseXid implements IEnterpriseXid {
  protected static readonly XID_FORMAT_ID: number = 0x465A425A;

  protected readonly formatId: number;
  protected readonly globalTransactionId: Uint8Array;
  protected readonly branchQualifier: Uint8Array;
  protected readonly xidString: string;

  constructor(
    formatId: number = AbstractBaseEnterpriseXid.XID_FORMAT_ID,
    globalTransactionId: Uint8Array,
    branchQualifier: Uint8Array,
    xidString: string,
  ) {
    this.formatId = formatId;
    this.globalTransactionId = globalTransactionId;
    this.branchQualifier = branchQualifier;
    this.xidString = xidString;
  }

  abstract getFormatId(): number;
  abstract getGlobalTransactionId(): Uint8Array;
  abstract getBranchQualifier(): Uint8Array;
  abstract getXidString(): string;
}

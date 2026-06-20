import { AbstractBaseEnterpriseXid } from "../abstracts/AbstractBaseEnterpriseXid.js";

export class UuidEnterpriseXidImpl extends AbstractBaseEnterpriseXid {
  private static readonly DEFAULT_FORMAT_ID: number = 0x465A425A;
  private static readonly GLOBAL_TRANSACTION_ID_LENGTH: number = 16;
  private static readonly BRANCH_QUALIFIER_LENGTH: number = 16;

  constructor(
    globalTransactionId?: Uint8Array,
    branchQualifier?: Uint8Array,
    formatId: number = UuidEnterpriseXidImpl.DEFAULT_FORMAT_ID,
  ) {
    const gtid = globalTransactionId ?? UuidEnterpriseXidImpl.generateRandomBytes(
      UuidEnterpriseXidImpl.GLOBAL_TRANSACTION_ID_LENGTH,
    );
    const bq = branchQualifier ?? UuidEnterpriseXidImpl.generateRandomBytes(
      UuidEnterpriseXidImpl.BRANCH_QUALIFIER_LENGTH,
    );
    const xidStr = UuidEnterpriseXidImpl.buildXidString(formatId, gtid, bq);
    super(formatId, gtid, bq, xidStr);
  }

  override getFormatId(): number {
    return this.formatId;
  }

  override getGlobalTransactionId(): Uint8Array {
    return this.globalTransactionId;
  }

  override getBranchQualifier(): Uint8Array {
    return this.branchQualifier;
  }

  override getXidString(): string {
    return this.xidString;
  }

  static fromUuid(uuid: string): UuidEnterpriseXidImpl {
    const encoder = new TextEncoder();
    return new UuidEnterpriseXidImpl(encoder.encode(uuid), encoder.encode(uuid.substring(0, 8)));
  }

  private static generateRandomBytes(length: number): Uint8Array {
    const bytes = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
      bytes[i] = Math.floor(Math.random() * 256);
    }
    return bytes;
  }

  private static buildXidString(formatId: number, gtid: Uint8Array, bq: Uint8Array): string {
    const hex = (arr: Uint8Array): string =>
      Array.from(arr)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    return `XID:fmt=${formatId}:gtid=${hex(gtid)}:bq=${hex(bq)}:${Date.now()}`;
  }
}

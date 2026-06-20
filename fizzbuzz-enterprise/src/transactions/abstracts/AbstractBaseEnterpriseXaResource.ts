import type { IEnterpriseXaResource, IEnterpriseXid } from "../contracts/index.js";

export abstract class AbstractBaseEnterpriseXaResource implements IEnterpriseXaResource {
  protected static readonly DEFAULT_RECOVERY_FLAG: number = 16777216;

  abstract start(xid: IEnterpriseXid, flags: number): number;
  abstract end(xid: IEnterpriseXid, flags: number): number;
  abstract prepare(xid: IEnterpriseXid): number;
  abstract commit(xid: IEnterpriseXid, onePhase: boolean): number;
  abstract rollback(xid: IEnterpriseXid): number;
  abstract forget(xid: IEnterpriseXid): number;
  abstract recover(flag: number): IEnterpriseXid[];
  abstract getXaResourceName(): string;
  abstract getXaResourceVersion(): string;

  protected validateXid(xid: IEnterpriseXid): void {
    if (!xid) {
      throw new Error(
        `[${this.getXaResourceName()} v${this.getXaResourceVersion()}] ` +
        `XA resource operation failed: XID must not be null`,
      );
    }
  }

  protected assertValidFlags(flags: number, validFlags: number[]): void {
    if (!validFlags.includes(flags)) {
      throw new Error(
        `[${this.getXaResourceName()} v${this.getXaResourceVersion()}] ` +
        `Invalid XA flags: [${flags}]. Valid flags: [${validFlags.join(", ")}]`,
      );
    }
  }
}

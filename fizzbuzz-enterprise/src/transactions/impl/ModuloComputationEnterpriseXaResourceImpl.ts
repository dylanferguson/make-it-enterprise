import { AbstractBaseEnterpriseXaResource } from "../abstracts/AbstractBaseEnterpriseXaResource.js";
import type { IEnterpriseXid } from "../contracts/IEnterpriseXid.js";
import { XaResourceReturnCode, XaResourceFlag } from "../contracts/IEnterpriseXaResource.js";

export class ModuloComputationEnterpriseXaResourceImpl extends AbstractBaseEnterpriseXaResource {
  private static readonly XA_RESOURCE_NAME = "ModuloComputationEnterpriseXaResource";
  private static readonly XA_RESOURCE_VERSION = "1.0.0-XA-RESOURCE-MODULO";

  private preparedTransactions: Map<string, boolean> = new Map();
  private startedTransactions: Set<string> = new Set();
  private recoveryXids: IEnterpriseXid[] = [];

  override start(xid: IEnterpriseXid, flags: number): number {
    this.validateXid(xid);
    if (flags === XaResourceFlag.TMNOFLAGS) {
      this.startedTransactions.add(xid.getXidString());
      console.debug(
        `[${this.getXaResourceName()} v${this.getXaResourceVersion()}] ` +
        `XA start [${xid.getXidString()}]`,
      );
      return XaResourceReturnCode.XA_OK;
    }
    return XaResourceReturnCode.XAER_PROTO;
  }

  override end(xid: IEnterpriseXid, flags: number): number {
    this.validateXid(xid);
    const xidStr = xid.getXidString();
    if (this.startedTransactions.has(xidStr)) {
      if (flags === XaResourceFlag.TMSUCCESS || flags === XaResourceFlag.TMFAIL) {
        this.startedTransactions.delete(xidStr);
        console.debug(
          `[${this.getXaResourceName()} v${this.getXaResourceVersion()}] ` +
          `XA end [${xidStr}] with flags [${flags}]`,
        );
        return XaResourceReturnCode.XA_OK;
      }
    }
    return XaResourceReturnCode.XAER_NOTA;
  }

  override prepare(xid: IEnterpriseXid): number {
    this.validateXid(xid);
    const xidStr = xid.getXidString();
    this.preparedTransactions.set(xidStr, true);
    this.recoveryXids.push(xid);
    console.debug(
      `[${this.getXaResourceName()} v${this.getXaResourceVersion()}] ` +
      `XA prepare [${xidStr}] – returning XA_OK`,
    );
    return XaResourceReturnCode.XA_OK;
  }

  override commit(xid: IEnterpriseXid, onePhase: boolean): number {
    this.validateXid(xid);
    const xidStr = xid.getXidString();
    if (onePhase || this.preparedTransactions.get(xidStr)) {
      this.preparedTransactions.delete(xidStr);
      this.recoveryXids = this.recoveryXids.filter((rx) => rx.getXidString() !== xidStr);
      console.debug(
        `[${this.getXaResourceName()} v${this.getXaResourceVersion()}] ` +
        `XA commit [${xidStr}] onePhase=[${onePhase}]`,
      );
      return XaResourceReturnCode.XA_OK;
    }
    return XaResourceReturnCode.XAER_NOTA;
  }

  override rollback(xid: IEnterpriseXid): number {
    this.validateXid(xid);
    const xidStr = xid.getXidString();
    this.preparedTransactions.delete(xidStr);
    this.startedTransactions.delete(xidStr);
    this.recoveryXids = this.recoveryXids.filter((rx) => rx.getXidString() !== xidStr);
    console.debug(
      `[${this.getXaResourceName()} v${this.getXaResourceVersion()}] ` +
      `XA rollback [${xidStr}]`,
    );
    return XaResourceReturnCode.XA_OK;
  }

  override forget(xid: IEnterpriseXid): number {
    this.validateXid(xid);
    const xidStr = xid.getXidString();
    this.recoveryXids = this.recoveryXids.filter((rx) => rx.getXidString() !== xidStr);
    console.debug(
      `[${this.getXaResourceName()} v${this.getXaResourceVersion()}] ` +
      `XA forget [${xidStr}]`,
    );
    return XaResourceReturnCode.XA_OK;
  }

  override recover(flag: number): IEnterpriseXid[] {
    console.debug(
      `[${this.getXaResourceName()} v${this.getXaResourceVersion()}] ` +
      `XA recover called with flag [${flag}] – returning [${this.recoveryXids.length}] XID(s)`,
    );
    return [...this.recoveryXids];
  }

  override getXaResourceName(): string {
    return ModuloComputationEnterpriseXaResourceImpl.XA_RESOURCE_NAME;
  }

  override getXaResourceVersion(): string {
    return ModuloComputationEnterpriseXaResourceImpl.XA_RESOURCE_VERSION;
  }
}

import type { IEnterpriseXid } from "./IEnterpriseXid.js";

export const XaResourceReturnCode = {
  XA_RDONLY: 3,
  XA_OK: 0,
  XAER_RMERR: -3,
  XAER_NOTA: -4,
  XAER_PROTO: -6,
  XAER_RMFAIL: -7,
  XAER_DUPID: -8,
  XAER_INVAL: -5,
} as const;

export const XaResourceFlag = {
  TMNOFLAGS: 0,
  TMJOIN: 1,
  TMRESUME: 2,
  TMSUCCESS: 16777216,
  TMFAIL: 536870912,
  TMSUSPEND: 134217728,
  TMSTARTRSCAN: 16777216,
  TMENDRSCAN: 33554432,
  TMMIGRATE: 131072,
} as const;

export interface IEnterpriseXaResource {
  start(xid: IEnterpriseXid, flags: number): number;
  end(xid: IEnterpriseXid, flags: number): number;
  prepare(xid: IEnterpriseXid): number;
  commit(xid: IEnterpriseXid, onePhase: boolean): number;
  rollback(xid: IEnterpriseXid): number;
  forget(xid: IEnterpriseXid): number;
  recover(flag: number): IEnterpriseXid[];
  getXaResourceName(): string;
  getXaResourceVersion(): string;
}

import type { IEnterpriseServiceBean } from "./IEnterpriseServiceBean.js";

export interface IEnterpriseServiceHome {
  create(): IEnterpriseServiceBean;
  findByPrimaryKey(key: string): IEnterpriseServiceBean | null;
  remove(bean: IEnterpriseServiceBean): void;
  getHomeName(): string;
}

import type { ICompositeValueResolver } from "./ICompositeValueResolver.js";

export interface IEnterpriseServiceBean {
  ejbCreate(): void;
  ejbActivate(): void;
  ejbPassivate(): void;
  ejbRemove(): void;
  getServiceName(): string;
  getValueResolver(): ICompositeValueResolver;
}

import type { IEjbEntityContext } from "./IEjbEntityContext.js";

export interface IContainerManagedEntity {
  ejbCreate(primaryKey: unknown): void;
  ejbPostCreate(primaryKey: unknown): void;
  ejbActivate(): void;
  ejbPassivate(): void;
  ejbLoad(): void;
  ejbStore(): void;
  ejbRemove(): void;
  setEntityContext(ctx: IEjbEntityContext): void;
  unsetEntityContext(): void;
  getPrimaryKey(): unknown;
  isModified(): boolean;
  getEntityName(): string;
  getEntityVersion(): string;
}

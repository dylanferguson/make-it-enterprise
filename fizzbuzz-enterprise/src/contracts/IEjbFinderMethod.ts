import type { IContainerManagedEntity } from "./IContainerManagedEntity.js";

export interface IEjbFinderMethod {
  findByPrimaryKey<E extends IContainerManagedEntity>(primaryKey: unknown): E | null;
  findAll<E extends IContainerManagedEntity>(): readonly E[];
  findByNamedQuery<E extends IContainerManagedEntity>(
    queryName: string,
    params: Record<string, unknown>,
  ): readonly E[];
  getHomeName(): string;
  getFinderMethodNames(): readonly string[];
  registerFinderMethod(name: string, ejbql: string): void;
}

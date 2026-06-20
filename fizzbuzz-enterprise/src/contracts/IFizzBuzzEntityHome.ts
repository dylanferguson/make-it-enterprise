import type { IContainerManagedEntity } from "./IContainerManagedEntity.js";
import type { IEjbFinderMethod } from "./IEjbFinderMethod.js";

export interface IFizzBuzzEntityHome extends IEjbFinderMethod {
  create(value: number, result: string): IContainerManagedEntity;
  findByValue(value: number): IContainerManagedEntity | null;
  findByResultContaining(substring: string): readonly IContainerManagedEntity[];
  findByResultRange(minValue: number, maxValue: number): readonly IContainerManagedEntity[];
  getEntityHomeName(): string;
  getEntityHomeVersion(): string;
  getDeploymentDescriptorName(): string;
  getJndiName(): string;
}

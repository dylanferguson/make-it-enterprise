export interface IEjbObject {
  getEjbObjectName(): string;
  getEjbObjectVersion(): string;
  getEjbHandle(): string;
  invokeComputation(value: number): string;
  ejbRemove(): void;
}

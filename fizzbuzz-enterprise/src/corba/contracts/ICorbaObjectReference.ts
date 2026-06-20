export interface ICorbaObjectReference {
  getReferenceName(): string;
  getReferenceVersion(): string;
  getRepositoryId(): string;
  getObjectKey(): string;
  narrow<T>(target: new (...args: unknown[]) => T): T;
}

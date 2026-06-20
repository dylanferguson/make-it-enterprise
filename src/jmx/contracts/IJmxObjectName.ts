export interface IJmxObjectName {
  getDomain(): string;
  getKeyProperties(): ReadonlyMap<string, string>;
  getCanonicalName(): string;
  getObjectNameName(): string;
  getObjectNameVersion(): string;
  equals(other: IJmxObjectName): boolean;
}

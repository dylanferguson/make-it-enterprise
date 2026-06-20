import type { IJmxObjectName } from "../contracts/IJmxObjectName.js";

export abstract class AbstractBaseJmxObjectName implements IJmxObjectName {
  private static readonly OBJECT_NAME_NAME = "AbstractBaseJmxObjectName";
  private static readonly OBJECT_NAME_VERSION = "1.0.0-JMX-OBJECT-NAME";

  protected readonly domain: string;
  protected readonly keyProperties: ReadonlyMap<string, string>;
  protected readonly canonicalName: string;

  constructor(domain: string, keyProperties: Map<string, string>) {
    this.domain = domain;
    this.keyProperties = new Map(keyProperties);
    this.canonicalName = this.buildCanonicalName(domain, keyProperties);
  }

  private buildCanonicalName(domain: string, properties: Map<string, string>): string {
    const entries: string[] = [];
    properties.forEach((value, key) => {
      entries.push(`${key}=${value}`);
    });
    return `${domain}:${entries.join(",")}`;
  }

  getDomain(): string {
    return this.domain;
  }

  getKeyProperties(): ReadonlyMap<string, string> {
    return this.keyProperties;
  }

  getCanonicalName(): string {
    return this.canonicalName;
  }

  getObjectNameName(): string {
    return AbstractBaseJmxObjectName.OBJECT_NAME_NAME;
  }

  getObjectNameVersion(): string {
    return AbstractBaseJmxObjectName.OBJECT_NAME_VERSION;
  }

  equals(other: IJmxObjectName): boolean {
    return this.canonicalName === other.getCanonicalName();
  }

  abstract getObjectNameDescriptor(): string;
}

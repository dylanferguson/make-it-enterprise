import { AbstractBaseJmxObjectName } from "../abstracts/AbstractBaseJmxObjectName.js";

export class DefaultJmxObjectNameImpl extends AbstractBaseJmxObjectName {
  private static readonly OBJECT_NAME_DESCRIPTOR_PREFIX = "DefaultJmxObjectName";

  constructor(domain: string, keyProperties: Record<string, string>) {
    const props = new Map(Object.entries(keyProperties));
    super(domain, props);
  }

  getObjectNameDescriptor(): string {
    return `${DefaultJmxObjectNameImpl.OBJECT_NAME_DESCRIPTOR_PREFIX}[domain=${this.domain},properties=${this.canonicalName}]`;
  }

  static createFromCanonicalName(canonicalName: string): DefaultJmxObjectNameImpl {
    const colonIndex = canonicalName.indexOf(":");
    if (colonIndex === -1) {
      throw new Error(`Invalid JMX ObjectName canonical form: ${canonicalName}`);
    }
    const domain = canonicalName.substring(0, colonIndex);
    const propsStr = canonicalName.substring(colonIndex + 1);
    const props: Record<string, string> = {};
    propsStr.split(",").forEach((part) => {
      const eqIndex = part.indexOf("=");
      if (eqIndex !== -1) {
        props[part.substring(0, eqIndex)] = part.substring(eqIndex + 1);
      }
    });
    return new DefaultJmxObjectNameImpl(domain, props);
  }
}

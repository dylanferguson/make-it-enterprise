import type { IJmxObjectName } from "../contracts/IJmxObjectName.js";
import { AbstractBaseJmxMBean } from "../abstracts/AbstractBaseJmxMBean.js";
import { DefaultJmxObjectNameImpl } from "./DefaultJmxObjectNameImpl.js";

export class DefaultJmxMBeanImpl extends AbstractBaseJmxMBean {
  private static readonly MBEAN_TYPE_NAME = "DefaultJmxMBean";

  constructor(mbeanName: string, domain: string, type: string) {
    const objectName = new DefaultJmxObjectNameImpl(domain, {
      type: type,
      name: mbeanName,
    });
    super(mbeanName, objectName, type);
  }
}

import { AbstractBaseLifecycleManagedBean } from "./AbstractBaseLifecycleManagedBean.js";

export abstract class AbstractBaseResourceAdapter extends AbstractBaseLifecycleManagedBean {
  constructor(adapterName: string, adapterVersion: string) {
    super(adapterName, adapterVersion);
  }

  abstract override doStart(): void;
  abstract override doStop(): void;
  abstract override doInitialize(): void;
  abstract override doDestroy(): void;
}

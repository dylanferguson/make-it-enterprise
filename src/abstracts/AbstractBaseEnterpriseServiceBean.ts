import type { IEnterpriseServiceBean } from "../contracts/IEnterpriseServiceBean.js";
import type { ICompositeValueResolver } from "../contracts/ICompositeValueResolver.js";

export abstract class AbstractBaseEnterpriseServiceBean implements IEnterpriseServiceBean {
  protected initialized: boolean = false;
  protected activated: boolean = false;

  abstract ejbCreate(): void;
  abstract ejbActivate(): void;
  abstract ejbPassivate(): void;
  abstract ejbRemove(): void;
  abstract getServiceName(): string;
  abstract getValueResolver(): ICompositeValueResolver;

  protected assertInitialized(): void {
    if (!this.initialized) {
      throw new Error(
        `[${this.getServiceName()}] EJB not initialized — ejbCreate() must be called first`,
      );
    }
  }

  protected assertActivated(): void {
    if (!this.activated) {
      throw new Error(
        `[${this.getServiceName()}] EJB not activated — ejbActivate() must be called first`,
      );
    }
  }

  protected markInitialized(): void {
    this.initialized = true;
  }

  protected markActivated(): void {
    this.activated = true;
  }

  protected markPassivated(): void {
    this.activated = false;
  }

  protected markRemoved(): void {
    this.initialized = false;
    this.activated = false;
  }
}

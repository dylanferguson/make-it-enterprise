import type { IEjbEntityContext } from "../contracts/IEjbEntityContext.js";
import type { IContainerManagedEntity } from "../contracts/IContainerManagedEntity.js";

export abstract class AbstractBaseContainerManagedEntity implements IContainerManagedEntity {
  protected entityContext: IEjbEntityContext | null = null;
  protected primaryKey: unknown = null;
  protected modified: boolean = false;
  protected activated: boolean = false;
  private instanceInitialized: boolean = false;

  abstract getEntityName(): string;
  abstract getEntityVersion(): string;

  ejbCreate(primaryKey: unknown): void {
    this.templateMethodInitialize();
    this.preEjbCreate(primaryKey);
    this.primaryKey = primaryKey;
    this.modified = true;
    this.postEjbCreate(primaryKey);
    console.debug(`[${this.getEntityName()}] ejbCreate invoked for primaryKey=${primaryKey}`);
  }

  ejbPostCreate(primaryKey: unknown): void {
    this.preEjbPostCreate(primaryKey);
    this.postEjbPostCreate(primaryKey);
    console.debug(`[${this.getEntityName()}] ejbPostCreate completed for primaryKey=${primaryKey}`);
  }

  ejbActivate(): void {
    this.preEjbActivate();
    this.activated = true;
    this.postEjbActivate();
    console.debug(`[${this.getEntityName()}] ejbActivate completed`);
  }

  ejbPassivate(): void {
    this.preEjbPassivate();
    if (this.modified) {
      this.ejbStore();
    }
    this.activated = false;
    this.postEjbPassivate();
    console.debug(`[${this.getEntityName()}] ejbPassivate completed`);
  }

  ejbLoad(): void {
    this.assertEntityContextSet();
    this.preEjbLoad();
    const loaded = this.doEjbLoad();
    this.modified = false;
    this.postEjbLoad(loaded);
    console.debug(`[${this.getEntityName()}] ejbLoad completed`);
  }

  ejbStore(): void {
    if (!this.modified) {
      console.debug(`[${this.getEntityName()}] ejbStore skipped — no modifications since last load`);
      return;
    }
    this.preEjbStore();
    this.doEjbStore();
    this.modified = false;
    this.postEjbStore();
    console.debug(`[${this.getEntityName()}] ejbStore completed`);
  }

  ejbRemove(): void {
    this.preEjbRemove();
    this.doEjbRemove();
    this.primaryKey = null;
    this.modified = false;
    this.activated = false;
    this.postEjbRemove();
    console.debug(`[${this.getEntityName()}] ejbRemove completed`);
  }

  setEntityContext(ctx: IEjbEntityContext): void {
    this.entityContext = ctx;
    ctx.setEntityBean(this);
    this.onSetEntityContext(ctx);
    console.debug(`[${this.getEntityName()}] Entity context set: ${ctx.getEntityContextName()}`);
  }

  unsetEntityContext(): void {
    this.onUnsetEntityContext();
    if (this.entityContext !== null) {
      this.entityContext.setEntityBean(null);
    }
    this.entityContext = null;
    this.instanceInitialized = false;
    console.debug(`[${this.getEntityName()}] Entity context unset`);
  }

  getPrimaryKey(): unknown {
    return this.primaryKey;
  }

  isModified(): boolean {
    return this.modified;
  }

  setModified(modified: boolean): void {
    this.modified = modified;
  }

  protected abstract doEjbLoad(): boolean;
  protected abstract doEjbStore(): void;
  protected abstract doEjbRemove(): void;

  protected preEjbCreate(_primaryKey: unknown): void {}
  protected postEjbCreate(_primaryKey: unknown): void {}
  protected preEjbPostCreate(_primaryKey: unknown): void {}
  protected postEjbPostCreate(_primaryKey: unknown): void {}
  protected preEjbActivate(): void {}
  protected postEjbActivate(): void {}
  protected preEjbPassivate(): void {}
  protected postEjbPassivate(): void {}
  protected preEjbLoad(): void {}
  protected postEjbLoad(_loaded: boolean): void {}
  protected preEjbStore(): void {}
  protected postEjbStore(): void {}
  protected preEjbRemove(): void {}
  protected postEjbRemove(): void {}
  protected onSetEntityContext(_ctx: IEjbEntityContext): void {}
  protected onUnsetEntityContext(): void {}

  private templateMethodInitialize(): void {
    if (!this.instanceInitialized) {
      this.instanceInitialized = true;
    }
  }

  private assertEntityContextSet(): void {
    if (this.entityContext === null) {
      throw new Error(
        `[${this.getEntityName()}] Entity context not set — ejbLoad/ejbStore/ejbRemove requires a valid entity context`,
      );
    }
  }
}

import type { IEjbEntityContext } from "../../contracts/IEjbEntityContext.js";
import type { IContainerManagedEntity } from "../../contracts/IContainerManagedEntity.js";

export class FizzBuzzEntityContextImpl implements IEjbEntityContext {
  private static readonly ENTITY_CONTEXT_VERSION = "2.0.0-EJB-CONTEXT";
  private static readonly DEPLOYMENT_DESCRIPTOR_NAME = "ejb-jar.xml";

  private readonly contextName: string;
  private entityBean: IContainerManagedEntity | null = null;
  private primaryKey: unknown = null;
  private rollbackOnly: boolean = false;
  private environmentEntries: Map<string, unknown> = new Map();
  private readonly ejbLocalObject: object;
  private readonly ejbObject: object;
  private readonly timerServiceEnabled: boolean;

  constructor(
    contextName: string,
    timerServiceEnabled: boolean = false,
  ) {
    this.contextName = contextName;
    this.timerServiceEnabled = timerServiceEnabled;
    this.ejbLocalObject = this.createEJBLocalObjectProxy();
    this.ejbObject = this.createEJBObjectProxy();
    this.registerDefaultEnvironmentEntries();
  }

  getEntityBean(): IContainerManagedEntity | null {
    return this.entityBean;
  }

  setEntityBean(entity: IContainerManagedEntity | null): void {
    this.entityBean = entity;
  }

  getPrimaryKey(): unknown {
    return this.primaryKey;
  }

  setPrimaryKey(key: unknown): void {
    this.primaryKey = key;
  }

  isTransactionActive(): boolean {
    return false;
  }

  setRollbackOnly(): void {
    this.rollbackOnly = true;
    console.debug(`[${this.contextName}] Transaction marked for rollback`);
  }

  getUserTransaction(): unknown {
    return null;
  }

  getDeploymentDescriptorName(): string {
    return FizzBuzzEntityContextImpl.DEPLOYMENT_DESCRIPTOR_NAME;
  }

  getEntityContextName(): string {
    return this.contextName;
  }

  lookupEnvironmentEntry(name: string): unknown {
    const value = this.environmentEntries.get(name);
    if (value === undefined) {
      console.warn(`[${this.contextName}] Environment entry not found: ${name}`);
      return null;
    }
    return value;
  }

  bindEnvironmentEntry(name: string, value: unknown): void {
    this.environmentEntries.set(name, value);
  }

  getEJBLocalObject(): unknown {
    return this.ejbLocalObject;
  }

  getEJBObject(): unknown {
    return this.ejbObject;
  }

  timerServiceAvailable(): boolean {
    return this.timerServiceEnabled;
  }

  private registerDefaultEnvironmentEntries(): void {
    this.environmentEntries.set("java:comp/env/fizzbuzz/entity-cache-size", "1000");
    this.environmentEntries.set("java:comp/env/fizzbuzz/persistence-timeout", "30000");
    this.environmentEntries.set("java:comp/env/fizzbuzz/transaction-timeout", "60000");
  }

  private createEJBLocalObjectProxy(): object {
    const self = this;
    return new (class FizzBuzzEntityEJBLocalObject {
      getPrimaryKey(): unknown { return self.primaryKey; }
      getEntityContext(): IEjbEntityContext { return self; }
      getEJBLocalHome(): unknown { return null; }
      remove(): void {
        if (self.entityBean !== null) {
          self.entityBean.ejbRemove();
        }
      }
      isIdentical(other: unknown): boolean {
        return other === this;
      }
    })();
  }

  private createEJBObjectProxy(): object {
    const self = this;
    return new (class FizzBuzzEntityEJBObject {
      getPrimaryKey(): unknown { return self.primaryKey; }
      getEntityContext(): IEjbEntityContext { return self; }
      getEJBHome(): unknown { return null; }
      getHandle(): unknown { return null; }
      isIdentical(other: unknown): boolean {
        return other === this;
      }
      remove(): void {
        if (self.entityBean !== null) {
          self.entityBean.ejbRemove();
        }
      }
    })();
  }
}

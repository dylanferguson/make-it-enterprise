import type { IEjbPersistenceManager } from "../../contracts/IEjbPersistenceManager.js";
import type { IEjbQuery } from "../../contracts/IEjbQuery.js";
import type { IContainerManagedEntity } from "../../contracts/IContainerManagedEntity.js";
import type { IFizzBuzzEntityHome } from "../../contracts/IFizzBuzzEntityHome.js";
import { FizzBuzzEntityBeanImpl } from "./FizzBuzzEntityBeanImpl.js";
import { FizzBuzzEntityContextImpl } from "./FizzBuzzEntityContextImpl.js";

export class FizzBuzzEntityHomeImpl implements IFizzBuzzEntityHome {
  private static readonly HOME_NAME = "FizzBuzzEntityHome";
  private static readonly HOME_VERSION = "2.0.0-ENTITY-HOME";
  private static readonly JNDI_NAME = "java:comp/env/fizzbuzz/FizzBuzzEntityHome";

  private readonly persistenceManager: IEjbPersistenceManager;
  private readonly ejbQuery: IEjbQuery;
  private readonly finderMethodRegistry: Map<string, string> = new Map();
  private namedQueryCache: Map<string, readonly IContainerManagedEntity[]> = new Map();

  constructor(persistenceManager: IEjbPersistenceManager, ejbQuery: IEjbQuery) {
    this.persistenceManager = persistenceManager;
    this.ejbQuery = ejbQuery;
    this.registerDefaultFinderMethods();
  }

  create(value: number, result: string): IContainerManagedEntity {
    const entity = new FizzBuzzEntityBeanImpl();
    entity.setPersistenceManager(this.persistenceManager);

    const context = new FizzBuzzEntityContextImpl(
      `${FizzBuzzEntityHomeImpl.HOME_NAME}_context_${value}`,
      false,
    );
    entity.setEntityContext(context);

    entity.ejbCreate(value);
    entity.setEntityResult(result);
    entity.ejbPostCreate(value);

    this.persistenceManager.storeEntity(entity);
    this.clearNamedQueryCache();

    console.debug(
      `[${FizzBuzzEntityHomeImpl.HOME_NAME}] Entity created: value=${value}, result=${result}`,
    );
    return entity;
  }

  findByPrimaryKey<E extends IContainerManagedEntity>(primaryKey: unknown): E | null {
    return this.persistenceManager.loadEntity(primaryKey) as E | null;
  }

  findAll<E extends IContainerManagedEntity>(): readonly E[] {
    const results = this.ejbQuery.execute<E>(
      "FIND ALL OBJECT(FizzBuzzValue)",
      {},
    );
    return results;
  }

  findByValue(value: number): IContainerManagedEntity | null {
    const results = this.ejbQuery.execute<IContainerManagedEntity>(
      "FIND OBJECT(FizzBuzzValue) BY value",
      { value },
    );
    return results.length > 0 ? (results[0] ?? null) : null;
  }

  findByResultContaining(substring: string): readonly IContainerManagedEntity[] {
    return this.ejbQuery.execute<IContainerManagedEntity>(
      "FIND OBJECT(FizzBuzzValue) BY result",
      { result: substring },
    );
  }

  findByResultRange(minValue: number, maxValue: number): readonly IContainerManagedEntity[] {
    return this.ejbQuery.execute<IContainerManagedEntity>(
      "FIND OBJECT(FizzBuzzValue) BY range",
      { minValue, maxValue },
    );
  }

  findByNamedQuery<E extends IContainerManagedEntity>(
    queryName: string,
    params: Record<string, unknown>,
  ): readonly E[] {
    const cached = this.namedQueryCache.get(queryName);
    if (cached !== undefined && Object.keys(params).length === 0) {
      return cached as readonly E[];
    }

    const ejbql = this.finderMethodRegistry.get(queryName);
    if (ejbql === undefined) {
      console.warn(`[${FizzBuzzEntityHomeImpl.HOME_NAME}] Named query not found: ${queryName}`);
      return [];
    }

    const results = this.ejbQuery.execute<E>(ejbql, params);

    if (Object.keys(params).length === 0) {
      this.namedQueryCache.set(queryName, results as readonly IContainerManagedEntity[]);
    }

    return results;
  }

  getHomeName(): string {
    return FizzBuzzEntityHomeImpl.HOME_NAME;
  }

  getFinderMethodNames(): readonly string[] {
    return Array.from(this.finderMethodRegistry.keys());
  }

  registerFinderMethod(name: string, ejbql: string): void {
    this.finderMethodRegistry.set(name, ejbql);
    this.clearNamedQueryCache();
    console.debug(
      `[${FizzBuzzEntityHomeImpl.HOME_NAME}] Finder method registered: ${name} -> ${ejbql}`,
    );
  }

  getEntityHomeName(): string {
    return FizzBuzzEntityHomeImpl.HOME_NAME;
  }

  getEntityHomeVersion(): string {
    return FizzBuzzEntityHomeImpl.HOME_VERSION;
  }

  getDeploymentDescriptorName(): string {
    return "ejb-jar.xml";
  }

  getJndiName(): string {
    return FizzBuzzEntityHomeImpl.JNDI_NAME;
  }

  private registerDefaultFinderMethods(): void {
    this.finderMethodRegistry.set("findAll", "FIND ALL OBJECT(FizzBuzzValue)");
    this.finderMethodRegistry.set("findByValue", "FIND OBJECT(FizzBuzzValue) BY value");
    this.finderMethodRegistry.set("findByResultContaining", "FIND OBJECT(FizzBuzzValue) BY result");
    this.finderMethodRegistry.set("findByResultRange", "FIND OBJECT(FizzBuzzValue) BY range");
  }

  private clearNamedQueryCache(): void {
    this.namedQueryCache.clear();
  }
}

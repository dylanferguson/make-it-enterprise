import { AbstractBaseEjbQuery } from "../../abstracts/AbstractBaseEjbQuery.js";
import type { IEjbCompiledQuery } from "../../contracts/IEjbQuery.js";
import type { IEjbPersistenceManager } from "../../contracts/IEjbPersistenceManager.js";
import type { IContainerManagedEntity } from "../../contracts/IContainerManagedEntity.js";
import { FizzBuzzEntityBeanImpl } from "./FizzBuzzEntityBeanImpl.js";

export class FizzBuzzEjbQueryImpl extends AbstractBaseEjbQuery {
  private static readonly QUERY_LANGUAGE = "EJB-QL-2.1-ENTERPRISE";
  private static readonly QUERY_VERSION = "2.1.0-ENTERPRISE";

  private readonly persistenceManager: IEjbPersistenceManager;

  constructor(persistenceManager: IEjbPersistenceManager) {
    super();
    this.persistenceManager = persistenceManager;
  }

  override getQueryLanguage(): string {
    return FizzBuzzEjbQueryImpl.QUERY_LANGUAGE;
  }

  override getQueryVersion(): string {
    return FizzBuzzEjbQueryImpl.QUERY_VERSION;
  }

  override execute<E>(ejbql: string, params: Record<string, unknown>): E[] {
    const compiled = this.compile(ejbql);
    const results = this.resolveQuery(compiled, params) as unknown as E[];
    return results;
  }

  override executeSingle<E>(ejbql: string, params: Record<string, unknown>): E | null {
    const compiled = this.compile(ejbql);
    const results = this.resolveQuery(compiled, params);
    return (results.length > 0 ? results[0] : null) as unknown as E | null;
  }

  protected override doCompile(ejbql: string): IEjbCompiledQuery {
    const entityName = this.parseEntityName(ejbql);
    const methodName = this.parseFinderMethodName(ejbql);
    const paramNames = this.parseParameterNames(ejbql);
    const signature = `${entityName}.${methodName}(${paramNames.join(",")})`;

    return {
      getEntityName: () => entityName,
      getFinderMethodName: () => methodName,
      getParameterNames: () => paramNames,
      getEjbql: () => ejbql,
      getQuerySignature: () => signature,
    };
  }

  private resolveQuery(compiled: IEjbCompiledQuery, params: Record<string, unknown>): IContainerManagedEntity[] {
    const ejbql = compiled.getEjbql();
    const upper = ejbql.trim().toUpperCase();

    if (upper === "FIND ALL OBJECT(FIZZBUZZVALUE)") {
      const dtos = this.persistenceManager.findAllEntities();
      return dtos.map((dto) => {
        const entity = this.persistenceManager.loadEntity(dto.getValue());
        return entity !== null ? entity : this.createTransientEntity(dto.getValue(), dto.getResult());
      }).filter((e): e is IContainerManagedEntity => e !== null);
    }

    if (/FIND OBJECT\(FIZZBUZZVALUE\)\s+BY\s+VALUE/i.test(upper)) {
      const value = params["value"] ?? params["1"];
      if (typeof value === "number") {
        const entity = this.persistenceManager.loadEntity(value);
        if (entity !== null) return [entity];
        const dto = this.persistenceManager.findByPrimaryKey(value);
        if (dto !== null) {
          return [this.createTransientEntity(dto.getValue(), dto.getResult())];
        }
      }
      return [];
    }

    if (/FIND OBJECT\(FIZZBUZZVALUE\)\s+BY\s+RESULT/i.test(upper)) {
      const substring = params["result"] ?? params["1"];
      if (typeof substring === "string") {
        const allDtos = this.persistenceManager.findAllEntities();
        const matchingDtos = allDtos.filter(
          (dto) => dto.getResult() !== null && dto.getResult()!.includes(substring),
        );
        return matchingDtos.map((dto) => {
          const entity = this.persistenceManager.loadEntity(dto.getValue());
          return entity !== null ? entity : this.createTransientEntity(dto.getValue(), dto.getResult());
        });
      }
      return [];
    }

    if (/FIND OBJECT\(FIZZBUZZVALUE\)\s+BY\s+RANGE/i.test(upper)) {
      const min = params["minValue"] ?? params["1"] ?? 0;
      const max = params["maxValue"] ?? params["2"] ?? Infinity;
      const allDtos = this.persistenceManager.findAllEntities();
      const matchingDtos = allDtos.filter(
        (dto) => dto.getValue() >= (min as number) && dto.getValue() <= (max as number),
      );
      return matchingDtos.map((dto) => {
        const entity = this.persistenceManager.loadEntity(dto.getValue());
        return entity !== null ? entity : this.createTransientEntity(dto.getValue(), dto.getResult());
      });
    }

    console.warn(`[FizzBuzzEjbQueryImpl] Unsupported EJB-QL query: ${ejbql}`);
    return [];
  }

  private createTransientEntity(value: number, result: string | null): IContainerManagedEntity {
    const entity = new FizzBuzzEntityBeanImpl();
    entity.setPersistenceManager(this.persistenceManager);
    entity.setEntityValue(value);
    if (result !== null) {
      entity.setEntityResult(result);
    }
    return entity;
  }
}

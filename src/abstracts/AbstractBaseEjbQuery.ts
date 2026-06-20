import type { IEjbQuery, IEjbCompiledQuery } from "../contracts/IEjbQuery.js";

export abstract class AbstractBaseEjbQuery implements IEjbQuery {
  protected compiledQueryCache: Map<string, IEjbCompiledQuery> = new Map();
  protected static readonly EJBQL_GRAMMAR_VERSION = "2.1-ENTERPRISE";

  abstract getQueryLanguage(): string;
  abstract getQueryVersion(): string;

  abstract execute<E>(ejbql: string, params: Record<string, unknown>): E[];
  abstract executeSingle<E>(ejbql: string, params: Record<string, unknown>): E | null;

  supportsQuery(ejbql: string): boolean {
    const trimmed = ejbql.trim().toUpperCase();
    return trimmed.startsWith("SELECT") || trimmed.startsWith("FIND") || trimmed.startsWith("OBJECT");
  }

  compile(ejbql: string): IEjbCompiledQuery {
    const cached = this.compiledQueryCache.get(ejbql);
    if (cached !== undefined) {
      return cached;
    }
    const compiled = this.doCompile(ejbql);
    this.compiledQueryCache.set(ejbql, compiled);
    return compiled;
  }

  clearQueryCache(): void {
    this.compiledQueryCache.clear();
  }

  protected abstract doCompile(ejbql: string): IEjbCompiledQuery;

  protected parseFinderMethodName(ejbql: string): string {
    const match = ejbql.match(/FIND\s+(?:DISTINCT\s+)?OBJECT\(\s*(\w+)\s*\)\s+BY\s+(\w+)/i);
    if (match !== null && match[2] !== undefined) {
      return `findBy${match[2].charAt(0).toUpperCase()}${match[2].slice(1)}`;
    }
    const simpleMatch = ejbql.match(/SELECT\s+(?:DISTINCT\s+)?OBJECT\(\s*(\w+)\s*\)/i);
    if (simpleMatch !== null) {
      return "findAll";
    }
    return "findByNamedQuery";
  }

  protected parseEntityName(ejbql: string): string {
    const match = ejbql.match(/FROM\s+(\w+)/i);
    if (match !== null && match[1] !== undefined) {
      return match[1];
    }
    const objectMatch = ejbql.match(/OBJECT\(\s*(\w+)\s*\)/i);
    if (objectMatch !== null && objectMatch[1] !== undefined) {
      return objectMatch[1];
    }
    return "UnknownEntity";
  }

  protected parseParameterNames(ejbql: string): readonly string[] {
    const paramRegex = /\?(\w+)/g;
    const names: string[] = [];
    let match: RegExpExecArray | null;
    while ((match = paramRegex.exec(ejbql)) !== null) {
      if (match[1] !== undefined) {
        names.push(match[1]);
      }
    }
    return names;
  }
}

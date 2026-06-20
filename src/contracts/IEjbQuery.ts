export interface IEjbQuery {
  execute<E>(ejbql: string, params: Record<string, unknown>): E[];
  executeSingle<E>(ejbql: string, params: Record<string, unknown>): E | null;
  getQueryLanguage(): string;
  getQueryVersion(): string;
  supportsQuery(ejbql: string): boolean;
  compile(ejbql: string): IEjbCompiledQuery;
  clearQueryCache(): void;
}

export interface IEjbCompiledQuery {
  getEntityName(): string;
  getFinderMethodName(): string;
  getParameterNames(): readonly string[];
  getEjbql(): string;
  getQuerySignature(): string;
}

export interface IPipelineContext {
  getAttribute<T>(key: string): T | undefined;
  setAttribute<T>(key: string, value: T): void;
  removeAttribute(key: string): boolean;
  hasAttribute(key: string): boolean;
  getAttributeNames(): readonly string[];
  clear(): void;
  getExecutionId(): string;
  getStartTimestamp(): number;
  getElapsedMs(): number;
  recordStageExecution(stageName: string, durationMs: number): void;
  getStageExecutionHistory(): ReadonlyArray<{ stageName: string; durationMs: number }>;
}

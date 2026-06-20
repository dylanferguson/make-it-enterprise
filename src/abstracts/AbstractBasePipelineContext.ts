import type { IPipelineContext } from "../contracts/IPipelineContext.js";

export abstract class AbstractBasePipelineContext implements IPipelineContext {
  private readonly attributes: Map<string, unknown> = new Map();
  private readonly executionId: string;
  private readonly startTimestamp: number;
  private readonly stageExecutionHistory: { stageName: string; durationMs: number }[] = [];

  constructor() {
    this.executionId = `pipeline-ctx-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
    this.startTimestamp = performance.now();
  }

  abstract getContextName(): string;
  abstract getContextVersion(): string;

  getAttribute<T>(key: string): T | undefined {
    return this.attributes.get(key) as T | undefined;
  }

  setAttribute<T>(key: string, value: T): void {
    this.attributes.set(key, value);
  }

  removeAttribute(key: string): boolean {
    return this.attributes.delete(key);
  }

  hasAttribute(key: string): boolean {
    return this.attributes.has(key);
  }

  getAttributeNames(): readonly string[] {
    return Array.from(this.attributes.keys());
  }

  clear(): void {
    this.attributes.clear();
  }

  getExecutionId(): string {
    return this.executionId;
  }

  getStartTimestamp(): number {
    return this.startTimestamp;
  }

  getElapsedMs(): number {
    return performance.now() - this.startTimestamp;
  }

  recordStageExecution(stageName: string, durationMs: number): void {
    this.stageExecutionHistory.push({ stageName, durationMs });
  }

  getStageExecutionHistory(): ReadonlyArray<{ stageName: string; durationMs: number }> {
    return [...this.stageExecutionHistory];
  }
}

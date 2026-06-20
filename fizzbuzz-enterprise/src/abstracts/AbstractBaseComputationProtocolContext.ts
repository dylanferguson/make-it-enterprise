import type { IComputationProtocolContext } from "../contracts/IComputationProtocolContext.js";

export abstract class AbstractBaseComputationProtocolContext implements IComputationProtocolContext {
  private readonly contextId: string;
  private readonly correlationId: string;
  private readonly visitedLayers: Map<number, string> = new Map();
  private readonly layerTimestamps: Map<number, number> = new Map();
  private readonly attributes: Map<string, unknown> = new Map();
  private contextCompleted: boolean = false;
  private startTime: number;

  constructor(contextId: string, correlationId: string) {
    this.contextId = contextId;
    this.correlationId = correlationId;
    this.startTime = performance.now();
  }

  getContextId(): string {
    return this.contextId;
  }

  getCorrelationId(): string {
    return this.correlationId;
  }

  getLayerExecutionOrder(): readonly number[] {
    return Array.from(this.visitedLayers.keys());
  }

  recordLayerVisit(layerNumber: number, layerIdentifier: string): void {
    this.visitedLayers.set(layerNumber, layerIdentifier);
    this.layerTimestamps.set(layerNumber, performance.now());
  }

  getLayerExecutionTimestamps(): ReadonlyMap<number, number> {
    return this.layerTimestamps;
  }

  getVisitedLayerIdentifiers(): readonly string[] {
    return Array.from(this.visitedLayers.values());
  }

  setAttribute(key: string, value: unknown): void {
    this.attributes.set(key, value);
  }

  getAttribute(key: string): unknown | undefined {
    return this.attributes.get(key);
  }

  getAttributeKeys(): readonly string[] {
    return Array.from(this.attributes.keys());
  }

  isLayerVisited(layerNumber: number): boolean {
    return this.visitedLayers.has(layerNumber);
  }

  getTotalProcessingDurationMs(): number {
    return performance.now() - this.startTime;
  }

  markContextCompleted(): void {
    this.contextCompleted = true;
  }

  isContextCompleted(): boolean {
    return this.contextCompleted;
  }
}

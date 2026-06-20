export interface IComputationProtocolContext {
  getContextId(): string;
  getCorrelationId(): string;
  getLayerExecutionOrder(): readonly number[];
  recordLayerVisit(layerNumber: number, layerIdentifier: string): void;
  getLayerExecutionTimestamps(): ReadonlyMap<number, number>;
  getVisitedLayerIdentifiers(): readonly string[];
  setAttribute(key: string, value: unknown): void;
  getAttribute(key: string): unknown | undefined;
  getAttributeKeys(): readonly string[];
  isLayerVisited(layerNumber: number): boolean;
  getTotalProcessingDurationMs(): number;
  markContextCompleted(): void;
  isContextCompleted(): boolean;
}

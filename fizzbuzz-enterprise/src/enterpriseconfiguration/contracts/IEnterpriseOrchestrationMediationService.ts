export interface IEnterpriseOrchestrationMediationHandler {
  handle(value: number, next: (v: number) => string): string;
  getHandlerName(): string;
  getHandlerVersion(): string;
  getHandlerPriority(): number;
  isHandlerEnabled(): boolean;
}

export interface IEnterpriseOrchestrationMediationHandlerRegistry {
  registerHandler(handler: IEnterpriseOrchestrationMediationHandler): void;
  unregisterHandler(handlerName: string): boolean;
  getRegisteredHandlers(): readonly IEnterpriseOrchestrationMediationHandler[];
  getHandlerCount(): number;
  getRegistryName(): string;
  getRegistryVersion(): string;
}

export interface IEnterpriseOrchestrationMediationService {
  mediateValueResolution(value: number, innerResolver: (v: number) => string): string;
  mediateRangeResolution(start: number, end: number, innerResolver: (start: number, end: number) => readonly string[]): readonly string[];
  getServiceName(): string;
  getServiceVersion(): string;
  getActiveHandlerChainDescriptor(): string;
  getRegisteredHandlerCount(): number;
  isMediationEnabled(): boolean;
}

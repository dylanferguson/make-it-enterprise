import type { IEnterpriseOrchestrationMediationHandler } from "../contracts/IEnterpriseOrchestrationMediationService.js";

export abstract class AbstractBaseOrchestrationMediationHandlerImpl implements IEnterpriseOrchestrationMediationHandler {
  private readonly handlerName: string;
  private readonly handlerVersion: string;
  private readonly priority: number;
  private enabled: boolean;
  private nextHandler: IEnterpriseOrchestrationMediationHandler | null;

  constructor(handlerName: string, handlerVersion: string, priority: number, enabled: boolean = true) {
    this.handlerName = handlerName;
    this.handlerVersion = handlerVersion;
    this.priority = priority;
    this.enabled = enabled;
    this.nextHandler = null;
  }

  abstract handle(value: number, next: (v: number) => string): string;

  protected handleNext(value: number, next: (v: number) => string): string {
    if (this.nextHandler !== null && this.nextHandler.isHandlerEnabled()) {
      return this.nextHandler.handle(value, next);
    }
    return next(value);
  }

  setNextHandler(handler: IEnterpriseOrchestrationMediationHandler | null): void {
    this.nextHandler = handler;
  }

  getNextHandler(): IEnterpriseOrchestrationMediationHandler | null {
    return this.nextHandler;
  }

  getHandlerName(): string { return this.handlerName; }
  getHandlerVersion(): string { return this.handlerVersion; }
  getHandlerPriority(): number { return this.priority; }
  isHandlerEnabled(): boolean { return this.enabled; }
  setHandlerEnabled(enabled: boolean): void { this.enabled = enabled; }
}

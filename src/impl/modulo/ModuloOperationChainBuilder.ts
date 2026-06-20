import type { IModuloOperationChainHandler } from "../../contracts/IModuloOperationChainHandler.js";
import { ValidationModuloChainHandlerImpl } from "./handlers/ValidationModuloChainHandlerImpl.js";
import { CachingModuloChainHandlerImpl } from "./handlers/CachingModuloChainHandlerImpl.js";
import { AuditTrailModuloChainHandlerImpl } from "./handlers/AuditTrailModuloChainHandlerImpl.js";
import { NativeModuloOperatorChainHandlerImpl } from "./handlers/NativeModuloOperatorChainHandlerImpl.js";

export class ModuloOperationChainBuilder {
  private readonly preHandlers: IModuloOperationChainHandler[] = [];
  private readonly postHandlers: IModuloOperationChainHandler[] = [];
  private cachingEnabled: boolean = true;
  private auditEnabled: boolean = true;
  private validationEnabled: boolean = true;

  withValidation(enabled: boolean): this {
    this.validationEnabled = enabled;
    return this;
  }

  withCaching(enabled: boolean): this {
    this.cachingEnabled = enabled;
    return this;
  }

  withAudit(enabled: boolean): this {
    this.auditEnabled = enabled;
    return this;
  }

  withPreHandler(handler: IModuloOperationChainHandler): this {
    this.preHandlers.push(handler);
    return this;
  }

  withPostHandler(handler: IModuloOperationChainHandler): this {
    this.postHandlers.push(handler);
    return this;
  }

  build(): IModuloOperationChainHandler {
    const handlers: IModuloOperationChainHandler[] = [];

    if (this.validationEnabled) {
      handlers.push(new ValidationModuloChainHandlerImpl());
    }
    if (this.cachingEnabled) {
      handlers.push(new CachingModuloChainHandlerImpl());
    }
    if (this.auditEnabled) {
      handlers.push(new AuditTrailModuloChainHandlerImpl());
    }

    for (const handler of this.preHandlers) {
      handlers.push(handler);
    }

    handlers.push(new NativeModuloOperatorChainHandlerImpl());

    for (const handler of this.postHandlers) {
      handlers.push(handler);
    }

    handlers.sort((a, b) => b.getHandlerPriority() - a.getHandlerPriority());

    const head = handlers[0]!;
    let current = head;
    for (let i = 1; i < handlers.length; i++) {
      current = current.setNext(handlers[i]!);
    }

    return head;
  }
}

import type { IEnterpriseClassificationChainHandler } from "../contracts/index.js";

export abstract class AbstractBaseEnterpriseClassificationChainHandler
  implements IEnterpriseClassificationChainHandler
{
  protected abstract readonly handlerName: string;
  protected abstract readonly handlerVersion: string;
  protected abstract readonly handlerPriority: number;

  protected nextHandler: IEnterpriseClassificationChainHandler | null = null;

  abstract handleClassification(value: number): string | null;

  getHandlerName(): string {
    return this.handlerName;
  }

  getHandlerVersion(): string {
    return this.handlerVersion;
  }

  getHandlerPriority(): number {
    return this.handlerPriority;
  }

  setNextHandler(handler: IEnterpriseClassificationChainHandler | null): void {
    this.nextHandler = handler;
  }

  getNextHandler(): IEnterpriseClassificationChainHandler | null {
    return this.nextHandler;
  }
}

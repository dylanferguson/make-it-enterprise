import type { IEnterpriseComputationResolutionAdapter } from "../contracts/IEnterpriseComputationResolutionAdapter.js";
import type { IEnterpriseComputationResolutionAdapterChainHandler } from "../contracts/IEnterpriseComputationResolutionAdapterChainHandler.js";

export abstract class AbstractBaseEnterpriseComputationResolutionAdapterChainHandler
  implements IEnterpriseComputationResolutionAdapterChainHandler
{
  protected readonly handlerName: string;
  protected readonly handlerVersion: string;
  protected readonly handlerOrder: number;
  protected nextHandler: IEnterpriseComputationResolutionAdapterChainHandler | null;

  constructor(
    handlerName: string,
    handlerVersion: string,
    handlerOrder: number,
  ) {
    this.handlerName = handlerName;
    this.handlerVersion = handlerVersion;
    this.handlerOrder = handlerOrder;
    this.nextHandler = null;
  }

  setNextHandler(handler: IEnterpriseComputationResolutionAdapterChainHandler): void {
    this.nextHandler = handler;
  }

  getNextHandler(): IEnterpriseComputationResolutionAdapterChainHandler | null {
    return this.nextHandler;
  }

  abstract handleResolution(
    value: number,
    adapters: readonly IEnterpriseComputationResolutionAdapter[],
  ): string | null;

  getHandlerName(): string {
    return this.handlerName;
  }

  getHandlerVersion(): string {
    return this.handlerVersion;
  }

  getHandlerOrder(): number {
    return this.handlerOrder;
  }
}

export interface IModuloOperationChainHandler {
  setNext(handler: IModuloOperationChainHandler): IModuloOperationChainHandler;
  handleModulo(dividend: number, divisor: number, context: string | null): number;
  getHandlerName(): string;
  getHandlerPriority(): number;
}

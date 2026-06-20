export interface IModuloOperationHandlerDelegationBridge {
  delegateModuloOperation(dividend: number, divisor: number, correlationContext: string): number;
  getBridgeName(): string;
  getBridgeVersion(): string;
  isOperational(): boolean;
  acceptVisitor(visitor: IModuloOperationHandlerDelegationBridgeVisitor): void;
}

export interface IModuloOperationHandlerDelegationBridgeVisitor {
  visitBridge(bridge: IModuloOperationHandlerDelegationBridge): void;
  visitBridgeOperation(dividend: number, divisor: number, result: number): void;
  getVisitorName(): string;
}

import type { IModuloOperationHandlerDelegationBridge, IModuloOperationHandlerDelegationBridgeVisitor } from "../contracts/IModuloOperationHandlerDelegationBridge.js";

export abstract class AbstractBaseModuloOperationHandlerDelegationBridge
  implements IModuloOperationHandlerDelegationBridge
{
  private static readonly DEFAULT_BRIDGE_NAME = "AbstractBaseModuloOperationHandlerDelegationBridge";
  private static readonly DEFAULT_BRIDGE_VERSION = "1.0.0-BRIDGE";

  private readonly bridgeName: string;
  private readonly bridgeVersion: string;
  private operational: boolean = false;

  constructor(
    bridgeName: string = AbstractBaseModuloOperationHandlerDelegationBridge.DEFAULT_BRIDGE_NAME,
    bridgeVersion: string = AbstractBaseModuloOperationHandlerDelegationBridge.DEFAULT_BRIDGE_VERSION,
  ) {
    this.bridgeName = bridgeName;
    this.bridgeVersion = bridgeVersion;
  }

  abstract delegateModuloOperation(dividend: number, divisor: number, correlationContext: string): number;

  getBridgeName(): string {
    return this.bridgeName;
  }

  getBridgeVersion(): string {
    return this.bridgeVersion;
  }

  isOperational(): boolean {
    return this.operational;
  }

  acceptVisitor(visitor: IModuloOperationHandlerDelegationBridgeVisitor): void {
    visitor.visitBridge(this);
  }

  protected markOperational(): void {
    this.operational = true;
  }

  protected markNonOperational(): void {
    this.operational = false;
  }

  protected preOperationValidate(dividend: number, divisor: number): void {
    if (!this.operational) {
      throw new Error(
        `[${this.bridgeName}] Bridge is not operational. Cannot delegate modulo operation for ${dividend} / ${divisor}.`,
      );
    }
    if (!Number.isFinite(dividend) || !Number.isFinite(divisor)) {
      throw new Error(
        `[${this.bridgeName}] Invalid operands: dividend=${dividend}, divisor=${divisor}`,
      );
    }
    if (divisor === 0) {
      throw new Error(
        `[${this.bridgeName}] Division by zero intercepted at bridge layer`,
      );
    }
  }
}

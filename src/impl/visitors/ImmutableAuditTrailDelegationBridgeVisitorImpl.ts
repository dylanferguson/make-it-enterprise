import type { IModuloOperationHandlerDelegationBridgeVisitor, IModuloOperationHandlerDelegationBridge } from "../../contracts/IModuloOperationHandlerDelegationBridge.js";

export class ImmutableAuditTrailDelegationBridgeVisitorImpl
  implements IModuloOperationHandlerDelegationBridgeVisitor
{
  private static readonly VISITOR_NAME = "ImmutableAuditTrailDelegationBridgeVisitor";
  private static readonly MAX_AUDIT_RECORDS = 256;

  private readonly auditRecords: string[] = [];
  private visitedBridgeNames: Set<string> = new Set();

  visitBridge(bridge: IModuloOperationHandlerDelegationBridge): void {
    this.visitedBridgeNames.add(bridge.getBridgeName());
    console.debug(
      `[${ImmutableAuditTrailDelegationBridgeVisitorImpl.VISITOR_NAME}] Visiting bridge: ${bridge.getBridgeName()} v${bridge.getBridgeVersion()} (operational=${bridge.isOperational()})`,
    );
  }

  visitBridgeOperation(dividend: number, divisor: number, result: number): void {
    const record = `bridge:${dividend}%${divisor}=${result}:${Date.now()}`;
    if (this.auditRecords.length < ImmutableAuditTrailDelegationBridgeVisitorImpl.MAX_AUDIT_RECORDS) {
      this.auditRecords.push(record);
    }
  }

  getVisitorName(): string {
    return ImmutableAuditTrailDelegationBridgeVisitorImpl.VISITOR_NAME;
  }

  getVisitedBridgeNames(): readonly string[] {
    return Array.from(this.visitedBridgeNames);
  }

  getAuditRecordCount(): number {
    return this.auditRecords.length;
  }

  getAuditRecords(): readonly string[] {
    return [...this.auditRecords];
  }
}

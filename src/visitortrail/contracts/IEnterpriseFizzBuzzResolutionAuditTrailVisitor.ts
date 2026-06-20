export interface IEnterpriseFizzBuzzResolutionAuditTrailVisitor {
  visitResolution(value: number, strategyName: string, result: string): void;
  visitSpecificationEvaluation(divisor: number, value: number, satisfied: boolean): void;
  visitModuloArithmeticInvocation(dividend: number, divisor: number, remainder: number): void;
  getVisitorName(): string;
  getVisitorVersion(): string;
  getAuditTrail(): readonly AuditTrailEntry[];
  clearAuditTrail(): void;
}

export interface AuditTrailEntry {
  eventType: AuditEventType;
  timestamp: number;
  details: Record<string, unknown>;
}

export type AuditEventType = "RESOLUTION" | "SPECIFICATION_EVALUATION" | "MODULO_ARITHMETIC_INVOCATION";

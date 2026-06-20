import type { IEnterpriseModuloArithmeticVisitor } from "../../contracts/IEnterpriseModuloArithmeticVisitor.js";
import { AbstractBaseEnterpriseModuloArithmeticVisitor } from "../../abstracts/AbstractBaseEnterpriseModuloArithmeticVisitor.js";

export class AuditingModuloArithmeticVisitorDecoratorImpl
  extends AbstractBaseEnterpriseModuloArithmeticVisitor
{
  private static readonly DECORATOR_NAME = "AuditingModuloArithmeticVisitorDecorator";
  private static readonly DECORATOR_VERSION = "1.0.0-AUDITING-VISITOR-DECORATOR";

  private readonly delegate: IEnterpriseModuloArithmeticVisitor;
  private auditTrail: string[] = [];
  private static readonly MAX_AUDIT_TRAIL_SIZE = 500;

  constructor(delegate: IEnterpriseModuloArithmeticVisitor) {
    super();
    this.delegate = delegate;
  }

  override getVisitorName(): string {
    return AuditingModuloArithmeticVisitorDecoratorImpl.DECORATOR_NAME;
  }

  override getVisitorVersion(): string {
    return AuditingModuloArithmeticVisitorDecoratorImpl.DECORATOR_VERSION;
  }

  override visitModuloEvaluation(
    dividend: number,
    divisor: number,
    evaluationContext: string | null,
  ): number {
    const context = this.resolveContext(evaluationContext);
    const result = this.delegate.visitModuloEvaluation(dividend, divisor, context);
    const auditEntry =
      `[${this.getVisitorName()}] visitor=${this.delegate.getVisitorName()}, ` +
      `dividend=${dividend}, divisor=${divisor}, result=${result}, context=${context}`;
    this.appendAuditEntry(auditEntry);
    return result;
  }

  private appendAuditEntry(entry: string): void {
    this.auditTrail.push(entry);
    if (this.auditTrail.length > AuditingModuloArithmeticVisitorDecoratorImpl.MAX_AUDIT_TRAIL_SIZE) {
      this.auditTrail = this.auditTrail.slice(
        this.auditTrail.length - AuditingModuloArithmeticVisitorDecoratorImpl.MAX_AUDIT_TRAIL_SIZE,
      );
    }
  }

  getAuditTrail(): readonly string[] {
    return this.auditTrail;
  }

  getAuditTrailSize(): number {
    return this.auditTrail.length;
  }

  clearAuditTrail(): void {
    this.auditTrail = [];
  }

  getDelegateVisitorName(): string {
    return this.delegate.getVisitorName();
  }
}

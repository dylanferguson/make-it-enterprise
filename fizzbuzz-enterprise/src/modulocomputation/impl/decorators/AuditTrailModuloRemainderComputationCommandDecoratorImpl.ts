import type { IModuloRemainderComputationCommand } from "../../contracts/index.js";
import { AbstractBaseModuloRemainderComputationCommand } from "../../abstracts/AbstractBaseModuloRemainderComputationCommand.js";

export class AuditTrailModuloRemainderComputationCommandDecoratorImpl
  extends AbstractBaseModuloRemainderComputationCommand
{
  private static readonly DECORATOR_NAME = "AuditTrailModuloRemainderComputationCommandDecorator";
  private static readonly DECORATOR_VERSION = "1.0.0-AUDIT-TRAIL-DECORATOR";

  private readonly wrappedCommand: IModuloRemainderComputationCommand;
  private invocationCount: number;
  private readonly auditEntries: string[];

  constructor(wrappedCommand: IModuloRemainderComputationCommand) {
    super(
      AuditTrailModuloRemainderComputationCommandDecoratorImpl.DECORATOR_NAME,
      AuditTrailModuloRemainderComputationCommandDecoratorImpl.DECORATOR_VERSION,
    );
    this.wrappedCommand = wrappedCommand;
    this.invocationCount = 0;
    this.auditEntries = [];
  }

  executeComputation(value: number, divisor: number): number {
    this.invocationCount++;
    const startTime = Date.now();
    let result: number;
    let error: Error | null = null;
    try {
      result = this.wrappedCommand.executeComputation(value, divisor);
    } catch (e) {
      error = e instanceof Error ? e : new Error(String(e));
      this.recordAuditEntry(value, divisor, null, startTime, error);
      throw error;
    }
    this.recordAuditEntry(value, divisor, result, startTime, null);
    return result;
  }

  getWrappedCommand(): IModuloRemainderComputationCommand {
    return this.wrappedCommand;
  }

  getInvocationCount(): number {
    return this.invocationCount;
  }

  getAuditEntries(): readonly string[] {
    return [...this.auditEntries];
  }

  private recordAuditEntry(
    value: number,
    divisor: number,
    result: number | null,
    startTime: number,
    error: Error | null,
  ): void {
    const duration = Date.now() - startTime;
    const entry = error !== null
      ? `[AUDIT] command=[${this.wrappedCommand.getCommandName()}], value=[${value}], divisor=[${divisor}], error=[${error.message}], durationMs=[${duration}], invocation=[${this.invocationCount}]`
      : `[AUDIT] command=[${this.wrappedCommand.getCommandName()}], value=[${value}], divisor=[${divisor}], result=[${result}], durationMs=[${duration}], invocation=[${this.invocationCount}]`;
    this.auditEntries.push(entry);
  }
}

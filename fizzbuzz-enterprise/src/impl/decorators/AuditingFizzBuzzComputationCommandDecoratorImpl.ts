import { AbstractBaseFizzBuzzComputationCommandDecorator } from "../../abstracts/AbstractBaseFizzBuzzComputationCommandDecorator.js";
import type { IFizzBuzzComputationCommand } from "../../contracts/IFizzBuzzComputationCommand.js";
import type { IFizzBuzzComputationRequest } from "../../contracts/IFizzBuzzComputationRequest.js";
import type { IFizzBuzzComputationResponse } from "../../contracts/IFizzBuzzComputationResponse.js";

export class AuditingFizzBuzzComputationCommandDecoratorImpl extends AbstractBaseFizzBuzzComputationCommandDecorator {
  private static readonly DECORATOR_NAME = "AuditingFizzBuzzComputationCommandDecorator";
  private static readonly DECORATOR_VERSION = "1.0.0-DECORATOR";
  private static readonly COMMAND_NAME = "AuditingFizzBuzzComputationCommand";
  private static readonly COMMAND_VERSION = "1.0.0-AUDITING-COMMAND";
  private static readonly COMMAND_GROUP = "FIZZBUZZ_VALUE_RESOLUTION_AUDITING";

  private readonly auditLog: Array<{
    value: number;
    result: string;
    durationMs: number;
    timestamp: Date;
  }> = [];

  constructor(wrappedCommand: IFizzBuzzComputationCommand) {
    super(wrappedCommand);
  }

  override execute(request: IFizzBuzzComputationRequest): IFizzBuzzComputationResponse {
    const startTime = performance.now();
    const response = this.wrappedCommand.execute(request);
    const durationMs = performance.now() - startTime;
    this.auditLog.push({
      value: request.getRequestedValue(),
      result: response.getComputedResult(),
      durationMs,
      timestamp: new Date(),
    });
    return response;
  }

  override getCommandName(): string {
    return AuditingFizzBuzzComputationCommandDecoratorImpl.COMMAND_NAME;
  }

  override getCommandVersion(): string {
    return AuditingFizzBuzzComputationCommandDecoratorImpl.COMMAND_VERSION;
  }

  override canExecute(input: number): boolean {
    return Number.isFinite(input) && input >= 0;
  }

  override getCommandGroup(): string {
    return AuditingFizzBuzzComputationCommandDecoratorImpl.COMMAND_GROUP;
  }

  override getDecoratorName(): string {
    return AuditingFizzBuzzComputationCommandDecoratorImpl.DECORATOR_NAME;
  }

  override getDecoratorVersion(): string {
    return AuditingFizzBuzzComputationCommandDecoratorImpl.DECORATOR_VERSION;
  }

  getAuditLog(): readonly typeof this.auditLog[number][] {
    return [...this.auditLog];
  }

  clearAuditLog(): void {
    this.auditLog.length = 0;
  }
}

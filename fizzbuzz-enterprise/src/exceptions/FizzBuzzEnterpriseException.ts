export class FizzBuzzEnterpriseException extends Error {
  private readonly errorCode: string;
  private readonly exceptionTimestamp: Date;
  private readonly exceptionCause: Error | null;

  constructor(
    message: string,
    errorCode: string = "FIZZBUZZ-0000",
    errorCause: Error | null = null,
  ) {
    super(message, errorCause !== null ? { cause: errorCause } : undefined);
    this.name = "FizzBuzzEnterpriseException" as typeof Error.prototype.name;
    this.errorCode = errorCode;
    this.exceptionTimestamp = new Date();
    this.exceptionCause = errorCause;
  }

  getErrorCode(): string {
    return this.errorCode;
  }

  getTimestamp(): Date {
    return this.exceptionTimestamp;
  }

  getCause(): Error | null {
    return this.exceptionCause;
  }

  toDiagnosticPayload(): Record<string, unknown> {
    return {
      errorCode: this.errorCode,
      message: this.message,
      timestamp: this.exceptionTimestamp.toISOString(),
      cause: this.exceptionCause?.message ?? null,
      stackTrace: this.stack ?? null,
    };
  }
}

import { FizzBuzzEnterpriseException } from "./FizzBuzzEnterpriseException.js";

export class ApplicationContextInitializationException extends FizzBuzzEnterpriseException {
  constructor(
    message: string,
    errorCode: string = "FIZZBUZZ-APPLICATION-CONTEXT-0001",
    errorCause: Error | null = null,
  ) {
    super(message, errorCode, errorCause);
    this.name = "ApplicationContextInitializationException" as typeof Error.prototype.name;
  }
}

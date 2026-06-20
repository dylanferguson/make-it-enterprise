import { FizzBuzzEnterpriseException } from "./FizzBuzzEnterpriseException.js";

export class PipelineExecutionException extends FizzBuzzEnterpriseException {
  public readonly pipelineName: string;
  public readonly stageName: string | null;
  public readonly input: unknown;

  constructor(
    message: string,
    pipelineName: string,
    stageName: string | null = null,
    input: unknown = null,
    errorCause: Error | null = null,
  ) {
    super(message, "FIZZBUZZ-PIPELINE-0001", errorCause);
    this.name = "PipelineExecutionException";
    this.pipelineName = pipelineName;
    this.stageName = stageName;
    this.input = input;
  }

  getPipelineName(): string {
    return this.pipelineName;
  }

  getStageName(): string | null {
    return this.stageName;
  }

  getInput(): unknown {
    return this.input;
  }
}

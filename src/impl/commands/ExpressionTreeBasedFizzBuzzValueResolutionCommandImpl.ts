import { AbstractBaseFizzBuzzComputationCommand } from "../../abstracts/AbstractBaseFizzBuzzComputationCommand.js";
import type { IFizzBuzzComputationRequest } from "../../contracts/IFizzBuzzComputationRequest.js";
import type { IFizzBuzzComputationResponse } from "../../contracts/IFizzBuzzComputationResponse.js";
import type { IFizzBuzzExpressionEvaluator } from "../../contracts/IFizzBuzzExpressionEvaluator.js";
import { FizzBuzzComputationResponseImpl } from "../dto/FizzBuzzComputationResponseImpl.js";

export class ExpressionTreeBasedFizzBuzzValueResolutionCommandImpl extends AbstractBaseFizzBuzzComputationCommand {
  private static readonly COMMAND_NAME = "ExpressionTreeBasedFizzBuzzValueResolutionCommand";
  private static readonly COMMAND_VERSION = "2.0.0-INTERPRETER-COMMAND";
  private static readonly COMMAND_GROUP = "FIZZBUZZ_EXPRESSION_TREE_RESOLUTION";

  private readonly expressionEvaluator: IFizzBuzzExpressionEvaluator;
  private readonly defaultNumberTransformer: (value: number) => string;

  constructor(
    expressionEvaluator: IFizzBuzzExpressionEvaluator,
    defaultNumberTransformer?: (value: number) => string,
  ) {
    super();
    this.expressionEvaluator = expressionEvaluator;
    this.defaultNumberTransformer = defaultNumberTransformer ?? ((v: number): string => v.toString());
  }

  override execute(request: IFizzBuzzComputationRequest): IFizzBuzzComputationResponse {
    this.validateRequest(request);
    const value = request.getRequestedValue();
    const evaluatedResult = this.expressionEvaluator.evaluate(value);
    const result = evaluatedResult !== null
      ? evaluatedResult
      : this.defaultNumberTransformer(value);
    const response = new FizzBuzzComputationResponseImpl(
      value,
      result,
      `expr:${request.getRequestId()}`,
      request.getRequestId(),
    );
    return response;
  }

  override getCommandName(): string {
    return ExpressionTreeBasedFizzBuzzValueResolutionCommandImpl.COMMAND_NAME;
  }

  override getCommandVersion(): string {
    return ExpressionTreeBasedFizzBuzzValueResolutionCommandImpl.COMMAND_VERSION;
  }

  override canExecute(input: number): boolean {
    return Number.isFinite(input) && input >= 0;
  }

  override getCommandGroup(): string {
    return ExpressionTreeBasedFizzBuzzValueResolutionCommandImpl.COMMAND_GROUP;
  }

  getExpressionEvaluator(): IFizzBuzzExpressionEvaluator {
    return this.expressionEvaluator;
  }
}

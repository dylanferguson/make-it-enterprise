import { AbstractBaseFizzBuzzSingleValueResolutionFacade } from "../../abstracts/AbstractBaseFizzBuzzSingleValueResolutionFacade.js";
import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IFizzBuzzComputationCommand } from "../../contracts/IFizzBuzzComputationCommand.js";
import type { IFizzBuzzCommandInvoker } from "../../contracts/IFizzBuzzCommandInvoker.js";
import type { IFizzBuzzCommandInfrastructureFacade } from "../../contracts/IFizzBuzzCommandInfrastructureFacade.js";
import type { IFizzBuzzComputationTemplate } from "../../contracts/IFizzBuzzComputationTemplate.js";
import type { IFizzBuzzComputationRequestBuilder } from "../../contracts/IFizzBuzzComputationRequestBuilder.js";
import type { IFizzBuzzServiceDelegate } from "../../contracts/IFizzBuzzServiceDelegate.js";
import type { IFizzBuzzComputationRequest } from "../../contracts/IFizzBuzzComputationRequest.js";
import type { IFizzBuzzComputationResponse } from "../../contracts/IFizzBuzzComputationResponse.js";

export class FizzBuzzSingleValueResolutionFacadeImpl
  extends AbstractBaseFizzBuzzSingleValueResolutionFacade
  implements IFizzBuzzSingleValueResolutionFacade
{
  private static readonly FACADE_NAME = "FizzBuzzSingleValueResolutionFacade";
  private static readonly FACADE_VERSION = "2.0.0-RESOLUTION-FACADE-ENTERPRISE";
  private static readonly REQUEST_ORIGIN = "FizzBuzzCommandInfrastructureFacade";
  private static readonly DEFAULT_REQUEST_ID_PREFIX = "req:cmd:value";

  private readonly requestBuilder: IFizzBuzzComputationRequestBuilder;
  private readonly commandInvoker: IFizzBuzzCommandInvoker;
  private readonly computationCommand: IFizzBuzzComputationCommand;
  private readonly computationTemplate: IFizzBuzzComputationTemplate;

  constructor(
    requestBuilder: IFizzBuzzComputationRequestBuilder,
    commandInvoker: IFizzBuzzCommandInvoker,
    computationCommand: IFizzBuzzComputationCommand,
    computationTemplate: IFizzBuzzComputationTemplate,
  ) {
    super();
    this.requestBuilder = requestBuilder;
    this.commandInvoker = commandInvoker;
    this.computationCommand = computationCommand;
    this.computationTemplate = computationTemplate;
  }

  override resolveValue(value: number): string {
    this.validateResolutionValue(value);
    const request = this.buildResolutionRequest(value);
    const response = this.computationTemplate.executeComputation(
      this.computationCommand,
      request,
    );
    return response.getComputedResult();
  }

  override resolveRange(start: number, end: number): readonly string[] {
    this.validateRangeBounds(start, end);
    const responses: string[] = [];
    for (let i = start; i <= end; i++) {
      const request = this.buildRangeResolutionRequest(i, start, end);
      const response = this.computationTemplate.executeComputation(
        this.computationCommand,
        request,
      );
      responses.push(response.getComputedResult());
    }
    return responses;
  }

  override getFacadeName(): string {
    return FizzBuzzSingleValueResolutionFacadeImpl.FACADE_NAME;
  }

  override getFacadeVersion(): string {
    return FizzBuzzSingleValueResolutionFacadeImpl.FACADE_VERSION;
  }

  getRequestBuilder(): IFizzBuzzComputationRequestBuilder {
    return this.requestBuilder;
  }

  getCommandInvoker(): IFizzBuzzCommandInvoker {
    return this.commandInvoker;
  }

  getComputationCommand(): IFizzBuzzComputationCommand {
    return this.computationCommand;
  }

  getComputationTemplate(): IFizzBuzzComputationTemplate {
    return this.computationTemplate;
  }

  private buildResolutionRequest(value: number): IFizzBuzzComputationRequest {
    return this.requestBuilder
      .reset()
      .withRequestedValue(value)
      .withRequestOrigin(FizzBuzzSingleValueResolutionFacadeImpl.REQUEST_ORIGIN)
      .withRequestIdPrefix(FizzBuzzSingleValueResolutionFacadeImpl.DEFAULT_REQUEST_ID_PREFIX)
      .build();
  }

  private buildRangeResolutionRequest(
    value: number,
    rangeStart: number,
    rangeEnd: number,
  ): IFizzBuzzComputationRequest {
    return this.requestBuilder
      .reset()
      .withRequestedValue(value)
      .withRequestOrigin(FizzBuzzSingleValueResolutionFacadeImpl.REQUEST_ORIGIN)
      .withRequestIdPrefix(`req:cmd:range:${rangeStart}:${rangeEnd}:idx`)
      .build();
  }
}

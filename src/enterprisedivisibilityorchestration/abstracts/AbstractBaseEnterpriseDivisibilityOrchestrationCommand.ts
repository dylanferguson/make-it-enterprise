import type { IEnterpriseDivisibilityOrchestrationCommand } from "../contracts/IEnterpriseDivisibilityOrchestrationCommand.js";
import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IEnterpriseDivisibilityOrchestrationTemplateMethod } from "../contracts/IEnterpriseDivisibilityOrchestrationTemplateMethod.js";

export abstract class AbstractBaseEnterpriseDivisibilityOrchestrationCommand
  implements IEnterpriseDivisibilityOrchestrationCommand
{
  private readonly commandName: string;
  private readonly commandVersion: string;
  protected readonly innerFacade: IFizzBuzzSingleValueResolutionFacade;
  protected readonly orchestrationTemplate: IEnterpriseDivisibilityOrchestrationTemplateMethod;

  constructor(
    commandName: string,
    commandVersion: string,
    innerFacade: IFizzBuzzSingleValueResolutionFacade,
    orchestrationTemplate: IEnterpriseDivisibilityOrchestrationTemplateMethod,
  ) {
    this.commandName = commandName;
    this.commandVersion = commandVersion;
    this.innerFacade = innerFacade;
    this.orchestrationTemplate = orchestrationTemplate;
  }

  getCommandName(): string {
    return this.commandName;
  }

  getCommandVersion(): string {
    return this.commandVersion;
  }

  getCommandDescriptor(): string {
    return `${this.commandName} v${this.commandVersion}`;
  }

  abstract execute(payload: number): string;

  protected invokeInnerResolution(value: number): string {
    const compositeResult = this.innerFacade.resolveValue(value);
    return compositeResult;
  }
}

import type { IEnterpriseFizzBuzzTemplateMethodResolutionChainHandler } from "../contracts/IEnterpriseFizzBuzzTemplateMethodResolutionChainHandler.js";
import type { IDivisibilitySpecificationRegistry } from "../../specification/contracts/IDivisibilitySpecificationRegistry.js";
import type { IModuloArithmeticCommandInvoker } from "../../moduloarithmeticcommand/contracts/IModuloArithmeticCommandInvoker.js";
import type { IModuloArithmeticCommand } from "../../moduloarithmeticcommand/contracts/IModuloArithmeticCommand.js";

export abstract class AbstractBaseEnterpriseFizzBuzzTemplateMethodResolutionChainHandler
  implements IEnterpriseFizzBuzzTemplateMethodResolutionChainHandler
{
  protected readonly specificationRegistry: IDivisibilitySpecificationRegistry;
  protected readonly commandInvoker: IModuloArithmeticCommandInvoker;
  protected readonly moduloArithmeticCommand: IModuloArithmeticCommand;

  constructor(
    specificationRegistry: IDivisibilitySpecificationRegistry,
    commandInvoker: IModuloArithmeticCommandInvoker,
    moduloArithmeticCommand: IModuloArithmeticCommand,
  ) {
    this.specificationRegistry = specificationRegistry;
    this.commandInvoker = commandInvoker;
    this.moduloArithmeticCommand = moduloArithmeticCommand;
  }

  abstract getTemplateMethodName(): string;
  abstract getTemplateMethodVersion(): string;

  getTemplateMethodDescriptor(): string {
    return `${this.getTemplateMethodName()} v${this.getTemplateMethodVersion()}`;
  }

  executeTemplateResolution(
    value: number,
    innerResolver: (value: number) => string,
    templateContext: string | null,
  ): string {
    this.preResolutionHook(value, templateContext);
    const result = this.doResolve(value, innerResolver, templateContext);
    this.postResolutionHook(value, result, templateContext);
    return result;
  }

  protected preResolutionHook(_value: number, _templateContext: string | null): void {
  }

  protected postResolutionHook(
    _value: number,
    _result: string,
    _templateContext: string | null,
  ): void {
  }

  protected abstract doResolve(
    value: number,
    innerResolver: (value: number) => string,
    templateContext: string | null,
  ): string;

  protected evaluateDivisibility(value: number, divisor: number): boolean {
    const specification = this.specificationRegistry.getSpecificationForDivisor(divisor);
    if (specification !== null) {
      return specification.isSatisfiedBy(value);
    }
    const remainder = this.commandInvoker.invoke(this.moduloArithmeticCommand, value, divisor);
    return remainder === 0;
  }
}

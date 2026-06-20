import type { IDivisibilitySpecificationRegistry } from "../../specification/contracts/IDivisibilitySpecificationRegistry.js";
import type { IModuloArithmeticCommandInvoker } from "../../moduloarithmeticcommand/contracts/IModuloArithmeticCommandInvoker.js";
import type { IModuloArithmeticCommand } from "../../moduloarithmeticcommand/contracts/IModuloArithmeticCommand.js";
import { AbstractBaseEnterpriseFizzBuzzTemplateMethodResolutionChainHandler } from "../abstracts/AbstractBaseEnterpriseFizzBuzzTemplateMethodResolutionChainHandler.js";

export class SpecificationDrivenEnterpriseFizzBuzzTemplateMethodResolutionChainHandlerImpl
  extends AbstractBaseEnterpriseFizzBuzzTemplateMethodResolutionChainHandler
{
  private static readonly TEMPLATE_METHOD_NAME = "SpecificationDrivenEnterpriseFizzBuzzTemplateMethodResolutionChainHandler";
  private static readonly TEMPLATE_METHOD_VERSION = "1.0.0-SPECIFICATION-TEMPLATE-METHOD";

  constructor(
    specificationRegistry: IDivisibilitySpecificationRegistry,
    commandInvoker: IModuloArithmeticCommandInvoker,
    moduloArithmeticCommand: IModuloArithmeticCommand,
  ) {
    super(specificationRegistry, commandInvoker, moduloArithmeticCommand);
  }

  override getTemplateMethodName(): string {
    return SpecificationDrivenEnterpriseFizzBuzzTemplateMethodResolutionChainHandlerImpl.TEMPLATE_METHOD_NAME;
  }

  override getTemplateMethodVersion(): string {
    return SpecificationDrivenEnterpriseFizzBuzzTemplateMethodResolutionChainHandlerImpl.TEMPLATE_METHOD_VERSION;
  }

  protected override doResolve(
    value: number,
    innerResolver: (value: number) => string,
    _templateContext: string | null,
  ): string {
    const specThree = this.specificationRegistry.getSpecificationForDivisor(3);
    const specFive = this.specificationRegistry.getSpecificationForDivisor(5);
    const specFifteen = this.specificationRegistry.getSpecificationForDivisor(15);

    const isDivisibleByThree = specThree !== null ? specThree.isSatisfiedBy(value) : this.evaluateDivisibility(value, 3);
    const isDivisibleByFive = specFive !== null ? specFive.isSatisfiedBy(value) : this.evaluateDivisibility(value, 5);

    if (isDivisibleByThree && isDivisibleByFive) {
      return innerResolver(value);
    }
    if (isDivisibleByThree) {
      return innerResolver(value);
    }
    if (isDivisibleByFive) {
      return innerResolver(value);
    }
    return innerResolver(value);
  }
}

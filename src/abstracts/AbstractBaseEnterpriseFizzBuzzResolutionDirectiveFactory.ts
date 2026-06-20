import type { IEnterpriseFizzBuzzResolutionDirectiveFactory } from "../contracts/IEnterpriseFizzBuzzResolutionDirectiveFactory.js";
import type { IEnterpriseFizzBuzzResolutionDirective } from "../contracts/IEnterpriseFizzBuzzResolutionDirective.js";

export abstract class AbstractBaseEnterpriseFizzBuzzResolutionDirectiveFactory
  implements IEnterpriseFizzBuzzResolutionDirectiveFactory
{
  private static readonly FACTORY_FRAMEWORK_VERSION = "1.0.0-DIRECTIVE-FACTORY-FRAMEWORK";
  private static readonly DEFAULT_DIRECTIVE_ORIGIN = "DirectiveFactoryMediationLayer";
  private static readonly SINGLE_VALUE_DIRECTIVE_TYPE = "SINGLE_VALUE_DIRECTIVE";
  private static readonly RANGE_DIRECTIVE_TYPE = "RANGE_DIRECTIVE";

  abstract getFactoryName(): string;
  abstract getFactoryVersion(): string;

  abstract createSingleValueDirective(
    value: number,
    origin: string,
  ): IEnterpriseFizzBuzzResolutionDirective;

  abstract createRangeDirective(
    start: number,
    end: number,
    origin: string,
  ): IEnterpriseFizzBuzzResolutionDirective;

  protected getDefaultOrigin(): string {
    return AbstractBaseEnterpriseFizzBuzzResolutionDirectiveFactory.DEFAULT_DIRECTIVE_ORIGIN;
  }

  protected getSingleValueDirectiveType(): string {
    return AbstractBaseEnterpriseFizzBuzzResolutionDirectiveFactory.SINGLE_VALUE_DIRECTIVE_TYPE;
  }

  protected getRangeDirectiveType(): string {
    return AbstractBaseEnterpriseFizzBuzzResolutionDirectiveFactory.RANGE_DIRECTIVE_TYPE;
  }

  protected getFactoryFrameworkVersion(): string {
    return AbstractBaseEnterpriseFizzBuzzResolutionDirectiveFactory.FACTORY_FRAMEWORK_VERSION;
  }
}

import { AbstractBaseEnterpriseFizzBuzzResolutionDirectiveFactory } from "../../abstracts/AbstractBaseEnterpriseFizzBuzzResolutionDirectiveFactory.js";
import type { IEnterpriseFizzBuzzResolutionDirective } from "../../contracts/IEnterpriseFizzBuzzResolutionDirective.js";
import { SingleValueEnterpriseFizzBuzzResolutionDirectiveImpl } from "../directives/SingleValueEnterpriseFizzBuzzResolutionDirectiveImpl.js";
import { RangeEnterpriseFizzBuzzResolutionDirectiveImpl } from "../directives/RangeEnterpriseFizzBuzzResolutionDirectiveImpl.js";

export class StandardEnterpriseFizzBuzzResolutionDirectiveFactoryImpl extends AbstractBaseEnterpriseFizzBuzzResolutionDirectiveFactory {
  private static readonly FACTORY_NAME = "StandardEnterpriseFizzBuzzResolutionDirectiveFactory";
  private static readonly FACTORY_VERSION = "1.0.0-DIRECTIVE-FACTORY-IMPL";
  private static readonly DIRECTIVE_ID_PREFIX = "fbz-dir-";

  override createSingleValueDirective(
    value: number,
    origin: string,
  ): IEnterpriseFizzBuzzResolutionDirective {
    const directiveId = this.generateDirectiveId(value);
    return new SingleValueEnterpriseFizzBuzzResolutionDirectiveImpl(
      directiveId,
      value,
      origin,
    );
  }

  override createRangeDirective(
    start: number,
    end: number,
    origin: string,
  ): IEnterpriseFizzBuzzResolutionDirective {
    const directiveId = this.generateRangeDirectiveId(start, end);
    return new RangeEnterpriseFizzBuzzResolutionDirectiveImpl(
      directiveId,
      origin,
      undefined,
      start,
      end,
    );
  }

  getFactoryName(): string {
    return StandardEnterpriseFizzBuzzResolutionDirectiveFactoryImpl.FACTORY_NAME;
  }

  getFactoryVersion(): string {
    return StandardEnterpriseFizzBuzzResolutionDirectiveFactoryImpl.FACTORY_VERSION;
  }

  private generateDirectiveId(value: number): string {
    return `${StandardEnterpriseFizzBuzzResolutionDirectiveFactoryImpl.DIRECTIVE_ID_PREFIX}sv-${value}-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
  }

  private generateRangeDirectiveId(start: number, end: number): string {
    return `${StandardEnterpriseFizzBuzzResolutionDirectiveFactoryImpl.DIRECTIVE_ID_PREFIX}range-${start}-${end}-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
  }
}

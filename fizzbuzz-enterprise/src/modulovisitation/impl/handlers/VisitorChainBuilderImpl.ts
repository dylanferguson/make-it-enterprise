import type { IEnterpriseModuloArithmeticVisitor } from "../../contracts/IEnterpriseModuloArithmeticVisitor.js";
import type { IModuloArithmeticVisitorHandlerProduct } from "../../contracts/IVisitorDrivenModuloArithmeticHandler.js";
import { AbstractBaseVisitorDrivenModuloArithmeticHandlerProduct } from "../../abstracts/AbstractBaseVisitorDrivenModuloArithmeticHandler.js";
import { CachingModuloArithmeticVisitorDecoratorImpl } from "../visitors/CachingModuloArithmeticVisitorDecoratorImpl.js";
import { AuditingModuloArithmeticVisitorDecoratorImpl } from "../visitors/AuditingModuloArithmeticVisitorDecoratorImpl.js";

export class VisitorChainBuilderImpl {
  private static readonly BUILDER_NAME = "VisitorChainBuilder";
  private static readonly BUILDER_VERSION = "1.0.0-VISITOR-CHAIN-BUILDER";

  private readonly visitors: IEnterpriseModuloArithmeticVisitor[] = [];
  private cachingDecoratorEnabled: boolean = true;
  private auditingDecoratorEnabled: boolean = true;

  withVisitor(visitor: IEnterpriseModuloArithmeticVisitor): this {
    this.visitors.push(visitor);
    return this;
  }

  withCachingDecorator(enabled: boolean): this {
    this.cachingDecoratorEnabled = enabled;
    return this;
  }

  withAuditingDecorator(enabled: boolean): this {
    this.auditingDecoratorEnabled = enabled;
    return this;
  }

  build(): IModuloArithmeticVisitorHandlerProduct {
    return new ConfigurationProfileVisitorHandlerProductImpl(
      this.visitors,
      this.cachingDecoratorEnabled,
      this.auditingDecoratorEnabled,
    );
  }

  getBuilderName(): string {
    return VisitorChainBuilderImpl.BUILDER_NAME;
  }

  getBuilderVersion(): string {
    return VisitorChainBuilderImpl.BUILDER_VERSION;
  }
}

export class ConfigurationProfileVisitorHandlerProductImpl
  extends AbstractBaseVisitorDrivenModuloArithmeticHandlerProduct
{
  private static readonly PRODUCT_NAME = "ConfigurationProfileVisitorHandlerProduct";
  private static readonly PRODUCT_VERSION = "1.0.0-VISITOR-PRODUCT";

  private evaluationCount: number = 0;

  constructor(
    visitors: IEnterpriseModuloArithmeticVisitor[],
    cachingEnabled: boolean,
    auditingEnabled: boolean,
  ) {
    let primary: IEnterpriseModuloArithmeticVisitor | null = null;
    const decorators: IEnterpriseModuloArithmeticVisitor[] = [];

    if (visitors.length > 0) {
      primary = visitors[0]!;
      for (let i = 1; i < visitors.length; i++) {
        decorators.push(visitors[i]!);
      }
    } else {
      throw new Error(
        `[${ConfigurationProfileVisitorHandlerProductImpl.PRODUCT_NAME}] At least one visitor must be registered`,
      );
    }

    let effectivePrimary: IEnterpriseModuloArithmeticVisitor = primary!;
    if (cachingEnabled) {
      effectivePrimary = new CachingModuloArithmeticVisitorDecoratorImpl(effectivePrimary);
    }
    if (auditingEnabled) {
      effectivePrimary = new AuditingModuloArithmeticVisitorDecoratorImpl(effectivePrimary);
    }

    super(effectivePrimary, decorators);
  }

  override getHandlerName(): string {
    return ConfigurationProfileVisitorHandlerProductImpl.PRODUCT_NAME;
  }

  override getHandlerVersion(): string {
    return ConfigurationProfileVisitorHandlerProductImpl.PRODUCT_VERSION;
  }

  override evaluateModulo(
    dividend: number,
    divisor: number,
    context: string | null,
  ): number {
    this.evaluationCount++;
    return this.getPrimaryVisitor().visitModuloEvaluation(dividend, divisor, context);
  }

  getEvaluationCount(): number {
    return this.evaluationCount;
  }
}

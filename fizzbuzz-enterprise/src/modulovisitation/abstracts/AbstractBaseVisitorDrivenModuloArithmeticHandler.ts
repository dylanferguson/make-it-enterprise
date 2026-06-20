import type { IModuloArithmeticVisitorHandlerProduct } from "../contracts/IVisitorDrivenModuloArithmeticHandler.js";
import type { IEnterpriseModuloArithmeticVisitor } from "../contracts/IEnterpriseModuloArithmeticVisitor.js";

export abstract class AbstractBaseVisitorDrivenModuloArithmeticHandlerProduct
  implements IModuloArithmeticVisitorHandlerProduct
{
  protected readonly primaryVisitor: IEnterpriseModuloArithmeticVisitor;
  protected readonly decoratorVisitors: IEnterpriseModuloArithmeticVisitor[];

  constructor(
    primaryVisitor: IEnterpriseModuloArithmeticVisitor,
    decoratorVisitors: IEnterpriseModuloArithmeticVisitor[] = [],
  ) {
    this.primaryVisitor = primaryVisitor;
    this.decoratorVisitors = decoratorVisitors;
  }

  abstract getHandlerName(): string;
  abstract getHandlerVersion(): string;

  abstract evaluateModulo(
    dividend: number,
    divisor: number,
    context: string | null,
  ): number;

  getActiveVisitorDescriptor(): string {
    const decoratorNames = this.decoratorVisitors
      .map((v) => `${v.getVisitorName()} v${v.getVisitorVersion()}`)
      .join(", ");
    return `primary=[${this.primaryVisitor.getVisitorName()} v${this.primaryVisitor.getVisitorVersion()}]` +
      (decoratorNames.length > 0 ? `, decorators=[${decoratorNames}]` : "");
  }

  getRegisteredVisitorCount(): number {
    return 1 + this.decoratorVisitors.length;
  }

  getPrimaryVisitor(): IEnterpriseModuloArithmeticVisitor {
    return this.primaryVisitor;
  }

  getDecoratorVisitors(): readonly IEnterpriseModuloArithmeticVisitor[] {
    return this.decoratorVisitors;
  }
}

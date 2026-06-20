import type { IEnterpriseModuloArithmeticVisitor } from "./IEnterpriseModuloArithmeticVisitor.js";

export interface IVisitorDrivenModuloArithmeticHandlerFactory {
  createHandler(visitor: IEnterpriseModuloArithmeticVisitor): IModuloArithmeticVisitorHandlerProduct;
  getFactoryName(): string;
  getFactoryVersion(): string;
}

export interface IModuloArithmeticVisitorHandlerProduct {
  getHandlerName(): string;
  getHandlerVersion(): string;
  evaluateModulo(dividend: number, divisor: number, context: string | null): number;
  getActiveVisitorDescriptor(): string;
  getRegisteredVisitorCount(): number;
}

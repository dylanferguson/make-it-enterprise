import type { IEnterpriseModuloArithmeticVisitor } from "./IEnterpriseModuloArithmeticVisitor.js";

export interface IEnterpriseModuloArithmeticVisitable {
  acceptModuloArithmeticVisitor(
    visitor: IEnterpriseModuloArithmeticVisitor,
    dividend: number,
    divisor: number,
    evaluationContext: string | null,
  ): number;
  getVisitableName(): string;
  getVisitableVersion(): string;
}

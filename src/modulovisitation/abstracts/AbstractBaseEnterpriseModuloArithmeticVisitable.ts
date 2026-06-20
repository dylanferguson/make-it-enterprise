import type { IEnterpriseModuloArithmeticVisitable } from "../contracts/IEnterpriseModuloArithmeticVisitable.js";
import type { IEnterpriseModuloArithmeticVisitor } from "../contracts/IEnterpriseModuloArithmeticVisitor.js";

export abstract class AbstractBaseEnterpriseModuloArithmeticVisitable
  implements IEnterpriseModuloArithmeticVisitable
{
  abstract getVisitableName(): string;
  abstract getVisitableVersion(): string;

  abstract acceptModuloArithmeticVisitor(
    visitor: IEnterpriseModuloArithmeticVisitor,
    dividend: number,
    divisor: number,
    evaluationContext: string | null,
  ): number;

  getVisitableDescriptor(): string {
    return `${this.getVisitableName()} v${this.getVisitableVersion()}`;
  }
}

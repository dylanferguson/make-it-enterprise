import type { IJaasPrincipal } from "../contracts/index.js";
import { AbstractBaseJaasPrincipal } from "../abstracts/AbstractBaseJaasPrincipal.js";

export class FizzBuzzPrincipalImpl extends AbstractBaseJaasPrincipal {
  private static readonly PRINCIPAL_DESCRIPTOR_PREFIX = "FizzBuzzPrincipal";

  constructor(name: string, principalType: string = "FizzBuzzUser") {
    super(name, principalType);
  }

  override implies(another: IJaasPrincipal): boolean {
    return another instanceof FizzBuzzPrincipalImpl &&
      another.getName() === this.getName();
  }

  getPrincipalDescriptor(): string {
    return `${FizzBuzzPrincipalImpl.PRINCIPAL_DESCRIPTOR_PREFIX}:${this.getPrincipalType()}:${this.getName()}`;
  }
}

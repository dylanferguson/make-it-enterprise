import type { IJaasPrincipal } from "../contracts/index.js";

export abstract class AbstractBaseJaasPrincipal implements IJaasPrincipal {
  private readonly name: string;
  private readonly principalType: string;

  constructor(name: string, principalType: string = "UNSPECIFIED") {
    this.name = name;
    this.principalType = principalType;
  }

  getName(): string {
    return this.name;
  }

  getPrincipalType(): string {
    return this.principalType;
  }

  implies(_another: IJaasPrincipal): boolean {
    return false;
  }

  abstract getPrincipalDescriptor(): string;
}

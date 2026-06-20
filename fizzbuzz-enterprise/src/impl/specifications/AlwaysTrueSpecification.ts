import { AbstractBaseFizzBuzzSpecification } from "../../abstracts/AbstractBaseFizzBuzzSpecification.js";

export class AlwaysTrueSpecification extends AbstractBaseFizzBuzzSpecification {
  override isSatisfiedBy(_value: number): boolean {
    return true;
  }

  override getSpecificationName(): string {
    return "AlwaysTrueSpecification";
  }
}

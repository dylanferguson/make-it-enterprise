import type { IFizzBuzzSpecification } from "../contracts/IFizzBuzzSpecification.js";

export abstract class AbstractBaseFizzBuzzSpecification implements IFizzBuzzSpecification {
  abstract isSatisfiedBy(value: number): boolean;
  abstract getSpecificationName(): string;

  and(other: IFizzBuzzSpecification): IFizzBuzzSpecification {
    const self = this;
    return new (class extends AbstractBaseFizzBuzzSpecification {
      override isSatisfiedBy(value: number): boolean {
        return self.isSatisfiedBy(value) && other.isSatisfiedBy(value);
      }
      override getSpecificationName(): string {
        return `${self.getSpecificationName()}And${other.getSpecificationName()}`;
      }
    })();
  }

  or(other: IFizzBuzzSpecification): IFizzBuzzSpecification {
    const self = this;
    return new (class extends AbstractBaseFizzBuzzSpecification {
      override isSatisfiedBy(value: number): boolean {
        return self.isSatisfiedBy(value) || other.isSatisfiedBy(value);
      }
      override getSpecificationName(): string {
        return `${self.getSpecificationName()}Or${other.getSpecificationName()}`;
      }
    })();
  }

  not(): IFizzBuzzSpecification {
    const self = this;
    return new (class extends AbstractBaseFizzBuzzSpecification {
      override isSatisfiedBy(value: number): boolean {
        return !self.isSatisfiedBy(value);
      }
      override getSpecificationName(): string {
        return `Not${self.getSpecificationName()}`;
      }
    })();
  }
}

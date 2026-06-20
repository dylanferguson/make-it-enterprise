export interface IFizzBuzzSpecification {
  isSatisfiedBy(value: number): boolean;
  and(other: IFizzBuzzSpecification): IFizzBuzzSpecification;
  or(other: IFizzBuzzSpecification): IFizzBuzzSpecification;
  not(): IFizzBuzzSpecification;
  getSpecificationName(): string;
}

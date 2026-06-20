import type { IEnterpriseFizzBuzzResolutionDirective } from "./IEnterpriseFizzBuzzResolutionDirective.js";

export interface IEnterpriseFizzBuzzResolutionDirectiveFactory {
  createSingleValueDirective(value: number, origin: string): IEnterpriseFizzBuzzResolutionDirective;
  createRangeDirective(start: number, end: number, origin: string): IEnterpriseFizzBuzzResolutionDirective;
  getFactoryName(): string;
  getFactoryVersion(): string;
}

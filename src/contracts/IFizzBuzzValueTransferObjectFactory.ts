import type { IFizzBuzzValueTransferObject } from "./IFizzBuzzValueTransferObject.js";

export interface IFizzBuzzValueTransferObjectFactory {
  createTransferObject(value: number): IFizzBuzzValueTransferObject;
  createTransferObjectWithResult(value: number, result: string): IFizzBuzzValueTransferObject;
  getFactoryName(): string;
  getFactoryVersion(): string;
}

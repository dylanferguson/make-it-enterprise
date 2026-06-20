import type { IFizzBuzzValueTransferObject } from "../../contracts/IFizzBuzzValueTransferObject.js";
import type { IFizzBuzzValueTransferObjectFactory } from "../../contracts/IFizzBuzzValueTransferObjectFactory.js";
import { FizzBuzzValueTransferObjectImpl } from "../dto/FizzBuzzValueTransferObjectImpl.js";

export class FizzBuzzValueTransferObjectFactoryImpl implements IFizzBuzzValueTransferObjectFactory {
  private static readonly FACTORY_NAME = "FizzBuzzValueTransferObjectFactoryImpl";
  private static readonly FACTORY_VERSION = "1.0.0-RELEASE";

  createTransferObject(value: number): IFizzBuzzValueTransferObject {
    return new FizzBuzzValueTransferObjectImpl(value);
  }

  createTransferObjectWithResult(value: number, result: string): IFizzBuzzValueTransferObject {
    const dto = new FizzBuzzValueTransferObjectImpl(value);
    dto.setResult(result);
    return dto;
  }

  getFactoryName(): string {
    return FizzBuzzValueTransferObjectFactoryImpl.FACTORY_NAME;
  }

  getFactoryVersion(): string {
    return FizzBuzzValueTransferObjectFactoryImpl.FACTORY_VERSION;
  }
}

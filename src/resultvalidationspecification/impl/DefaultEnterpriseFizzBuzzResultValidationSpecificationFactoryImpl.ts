import { AbstractBaseEnterpriseFizzBuzzResultValidationSpecificationFactoryImpl } from "../abstracts/AbstractBaseEnterpriseFizzBuzzResultValidationSpecificationFactoryImpl.js";
import type { IEnterpriseFizzBuzzResultValidationSpecification } from "../contracts/IEnterpriseFizzBuzzResultValidationSpecification.js";
import { AlwaysValidEnterpriseFizzBuzzResultValidationSpecificationImpl } from "./AlwaysValidEnterpriseFizzBuzzResultValidationSpecificationImpl.js";
import { LengthConstrainedEnterpriseFizzBuzzResultValidationSpecificationImpl } from "./LengthConstrainedEnterpriseFizzBuzzResultValidationSpecificationImpl.js";
import { DivisibilityConsistencyEnterpriseFizzBuzzResultValidationSpecificationImpl } from "./DivisibilityConsistencyEnterpriseFizzBuzzResultValidationSpecificationImpl.js";

export class DefaultEnterpriseFizzBuzzResultValidationSpecificationFactoryImpl
  extends AbstractBaseEnterpriseFizzBuzzResultValidationSpecificationFactoryImpl
{
  private static readonly FACTORY_NAME = "DefaultEnterpriseFizzBuzzResultValidationSpecificationFactory";
  private static readonly FACTORY_VERSION = "1.0.0-VALIDATION-FACTORY";

  constructor() {
    super(
      DefaultEnterpriseFizzBuzzResultValidationSpecificationFactoryImpl.FACTORY_NAME,
      DefaultEnterpriseFizzBuzzResultValidationSpecificationFactoryImpl.FACTORY_VERSION,
    );
  }

  override createAlwaysValidSpecification(): IEnterpriseFizzBuzzResultValidationSpecification {
    return new AlwaysValidEnterpriseFizzBuzzResultValidationSpecificationImpl();
  }

  override createLengthConstrainedSpecification(
    name: string,
    version: string,
    description: string,
    maxLength: number,
    priority: number,
  ): IEnterpriseFizzBuzzResultValidationSpecification {
    return new LengthConstrainedEnterpriseFizzBuzzResultValidationSpecificationImpl(
      name,
      version,
      description,
      maxLength,
      priority,
    );
  }

  override createDivisibilityConsistencySpecification(
    name: string,
    version: string,
    description: string,
    divisor: number,
    expectedOutput: string,
    priority: number,
  ): IEnterpriseFizzBuzzResultValidationSpecification {
    return new DivisibilityConsistencyEnterpriseFizzBuzzResultValidationSpecificationImpl(
      name,
      version,
      description,
      divisor,
      expectedOutput,
      priority,
    );
  }
}

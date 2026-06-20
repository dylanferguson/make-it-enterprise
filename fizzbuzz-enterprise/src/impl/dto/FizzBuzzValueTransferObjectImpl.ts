import { AbstractBaseFizzBuzzValueTransferObject } from "../../abstracts/AbstractBaseFizzBuzzValueTransferObject.js";

export class FizzBuzzValueTransferObjectImpl extends AbstractBaseFizzBuzzValueTransferObject {
  private static readonly TRANSFER_OBJECT_VERSION = "1.0.0-RELEASE";
  private static readonly SERIALIZATION_FORMAT = "FIZZBUZZ_DTO_V1";

  constructor(value: number) {
    super(value, FizzBuzzValueTransferObjectImpl.TRANSFER_OBJECT_VERSION);
    this.validateValue(value);
  }

  override getValue(): number {
    return this.value;
  }

  override getResult(): string | null {
    return this.result;
  }

  override setResult(result: string): void {
    this.result = result;
  }

  override hasResult(): boolean {
    return this.result !== null;
  }

  override toSerializablePayload(): Record<string, unknown> {
    return {
      serializationFormat: FizzBuzzValueTransferObjectImpl.SERIALIZATION_FORMAT,
      transferObjectVersion: this.transferObjectVersion,
      value: this.value,
      result: this.result,
      creationTimestamp: this.creationTimestamp.toISOString(),
    };
  }

  override getTransferObjectVersion(): string {
    return FizzBuzzValueTransferObjectImpl.TRANSFER_OBJECT_VERSION;
  }
}

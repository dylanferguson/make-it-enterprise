export interface IFizzBuzzValueTransferObject {
  getValue(): number;
  getResult(): string | null;
  setResult(result: string): void;
  hasResult(): boolean;
  toSerializablePayload(): Record<string, unknown>;
  getTransferObjectVersion(): string;
}

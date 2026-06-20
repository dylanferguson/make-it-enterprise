export interface IComputationRequestPrototype<TResult> {
  getPrototypeName(): string;
  getPrototypeVersion(): string;
  getPrototypeType(): string;
  getPrototypeId(): string;
  setPrototypeId(id: string): void;
  getParameterValue(): number;
  setParameterValue(value: number): void;
  getComputationContextMetadata(): Record<string, string>;
  setComputationContextMetadata(key: string, value: string): void;
  isResolved(): boolean;
  markResolved(result: TResult): void;
  getResolvedResult(): TResult | null;
  clone(): IComputationRequestPrototype<TResult>;
  getPrototypeDescriptorName(): string;
}

export interface IResultTransformer {
  transform(input: number, result: string): string;
  getTransformerName(): string;
  getTransformerPriority(): number;
}

import type { IFizzBuzzEvaluationContext } from "./IFizzBuzzEvaluationContext.js";

export interface IFizzBuzzEnterpriseEvaluationContext extends IFizzBuzzEvaluationContext {
  setAnnotation(key: string, value: string): void;
  getAnnotation(key: string): string | null;
  getAllAnnotations(): Readonly<Record<string, string>>;
  getOrigin(): string;
  getContextVersion(): string;
  clearAnnotations(): void;
}

import type { IComputationRequestPrototype } from "../contracts/IComputationRequestPrototype.js";

export abstract class AbstractBaseComputationRequestPrototype<TResult>
  implements IComputationRequestPrototype<TResult>
{
  private static readonly DEFAULT_PROTOTYPE_ID_PREFIX = "PROTOTYPE-";
  private static nextPrototypeSequence: number = 0;

  protected prototypeId: string;
  protected parameterValue: number;
  protected resolved: boolean = false;
  protected resolvedResult: TResult | null = null;
  protected readonly computationContextMetadata: Record<string, string> = {};

  protected abstract get prototypeName(): string;
  protected abstract get prototypeVersion(): string;
  protected abstract get prototypeType(): string;

  constructor(parameterValue: number, prototypeId?: string) {
    this.parameterValue = parameterValue;
    this.prototypeId = prototypeId ?? `${AbstractBaseComputationRequestPrototype.DEFAULT_PROTOTYPE_ID_PREFIX}${++AbstractBaseComputationRequestPrototype.nextPrototypeSequence}`;
  }

  getPrototypeName(): string { return this.prototypeName; }
  getPrototypeVersion(): string { return this.prototypeVersion; }
  getPrototypeType(): string { return this.prototypeType; }
  getPrototypeId(): string { return this.prototypeId; }
  setPrototypeId(id: string): void { this.prototypeId = id; }
  getParameterValue(): number { return this.parameterValue; }
  setParameterValue(value: number): void { this.parameterValue = value; }
  getComputationContextMetadata(): Record<string, string> { return { ...this.computationContextMetadata }; }
  setComputationContextMetadata(key: string, value: string): void { this.computationContextMetadata[key] = value; }
  isResolved(): boolean { return this.resolved; }
  markResolved(result: TResult): void { this.resolved = true; this.resolvedResult = result; }
  getResolvedResult(): TResult | null { return this.resolvedResult; }

  abstract clone(): IComputationRequestPrototype<TResult>;

  getPrototypeDescriptorName(): string {
    return `${this.prototypeName}(${this.prototypeType})`;
  }

  protected assignBaseState(target: AbstractBaseComputationRequestPrototype<TResult>): void {
    target.prototypeId = `${this.prototypeId}-CLONE-${++AbstractBaseComputationRequestPrototype.nextPrototypeSequence}`;
    target.parameterValue = this.parameterValue;
    target.resolved = false;
    target.resolvedResult = null;
    for (const [k, v] of Object.entries(this.computationContextMetadata)) {
      target.computationContextMetadata[k] = v;
    }
  }
}

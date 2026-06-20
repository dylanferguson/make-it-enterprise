import type { IAspectJoinPoint } from "../contracts/IAspectJoinPoint.js";
import type { IAspectPointcut } from "../contracts/IAspectPointcut.js";

export abstract class AbstractBaseAspectPointcut implements IAspectPointcut {
  private readonly pointcutName: string;
  private readonly pointcutVersion: string;

  constructor(pointcutName: string, pointcutVersion: string) {
    this.pointcutName = pointcutName;
    this.pointcutVersion = pointcutVersion;
  }

  getPointcutName(): string {
    return this.pointcutName;
  }

  getPointcutVersion(): string {
    return this.pointcutVersion;
  }

  abstract matches(joinPoint: IAspectJoinPoint): boolean;
  abstract getRegisteredExpressionPatterns(): readonly string[];
}

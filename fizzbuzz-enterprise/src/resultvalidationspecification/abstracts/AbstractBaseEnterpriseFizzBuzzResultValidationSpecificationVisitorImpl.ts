import type { IEnterpriseFizzBuzzResultValidationSpecificationVisitor } from "../contracts/IEnterpriseFizzBuzzResultValidationSpecificationVisitor.js";
import type { IEnterpriseFizzBuzzResultValidationSpecificationRegistry } from "../contracts/IEnterpriseFizzBuzzResultValidationSpecificationRegistry.js";
import type { IEnterpriseFizzBuzzResultValidationSpecification } from "../contracts/IEnterpriseFizzBuzzResultValidationSpecification.js";

export abstract class AbstractBaseEnterpriseFizzBuzzResultValidationSpecificationVisitorImpl
  implements IEnterpriseFizzBuzzResultValidationSpecificationVisitor
{
  private readonly _visitorName: string;
  private readonly _visitorVersion: string;
  private _visitationCount: number = 0;
  private _visitedSpecifications: string[] = [];
  private _lastVisited: string | null = null;

  constructor(
    visitorName: string,
    visitorVersion: string,
  ) {
    this._visitorName = visitorName;
    this._visitorVersion = visitorVersion;
  }

  getVisitorName(): string {
    return this._visitorName;
  }

  getVisitorVersion(): string {
    return this._visitorVersion;
  }

  getVisitationCount(): number {
    return this._visitationCount;
  }

  abstract visitRegistry(registry: IEnterpriseFizzBuzzResultValidationSpecificationRegistry): void;

  visitSpecification(specification: IEnterpriseFizzBuzzResultValidationSpecification): void {
    this._visitationCount++;
    this._lastVisited = specification.getSpecificationName();
    this._visitedSpecifications.push(specification.getSpecificationName());
  }

  getLastVisitedSpecificationName(): string | null {
    return this._lastVisited;
  }

  getVisitedSpecificationNames(): readonly string[] {
    return [...this._visitedSpecifications];
  }

  resetVisitationState(): void {
    this._visitationCount = 0;
    this._visitedSpecifications = [];
    this._lastVisited = null;
  }
}

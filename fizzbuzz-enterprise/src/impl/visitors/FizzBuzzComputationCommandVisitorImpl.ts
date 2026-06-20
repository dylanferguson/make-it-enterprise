import { AbstractBaseFizzBuzzCommandVisitor } from "../../abstracts/AbstractBaseFizzBuzzCommandVisitor.js";
import type { IFizzBuzzCommandHistoryEntry } from "../../contracts/IFizzBuzzCommandHistoryManager.js";

export class FizzBuzzComputationCommandVisitorImpl extends AbstractBaseFizzBuzzCommandVisitor {
  private static readonly VISITOR_NAME = "FizzBuzzComputationCommandVisitor";
  private static readonly VISITOR_VERSION = "1.0.0-VISITOR";

  private visitedEntryCount: number = 0;
  private readonly visitedResults: Map<string, string> = new Map();

  override visitCommandHistoryEntry(entry: IFizzBuzzCommandHistoryEntry): void {
    this.logVisit(entry);
    this.visitedEntryCount++;
    this.visitedResults.set(
      entry.getHistoryEntryId(),
      entry.getResponse().getComputedResult(),
    );
  }

  override getVisitorName(): string {
    return FizzBuzzComputationCommandVisitorImpl.VISITOR_NAME;
  }

  override getVisitorVersion(): string {
    return FizzBuzzComputationCommandVisitorImpl.VISITOR_VERSION;
  }

  getVisitedEntryCount(): number {
    return this.visitedEntryCount;
  }

  getVisitedResults(): ReadonlyMap<string, string> {
    return this.visitedResults;
  }

  reset(): void {
    this.visitedEntryCount = 0;
    this.visitedResults.clear();
  }
}

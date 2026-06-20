import type { IFizzBuzzCommandVisitor } from "../contracts/IFizzBuzzCommandVisitor.js";
import type { IFizzBuzzCommandHistoryEntry } from "../contracts/IFizzBuzzCommandHistoryManager.js";

export abstract class AbstractBaseFizzBuzzCommandVisitor implements IFizzBuzzCommandVisitor {
  abstract visitCommandHistoryEntry(entry: IFizzBuzzCommandHistoryEntry): void;
  abstract getVisitorName(): string;
  abstract getVisitorVersion(): string;

  protected logVisit(entry: IFizzBuzzCommandHistoryEntry): void {
    console.debug(
      `[${this.getVisitorName()}] Visiting command history entry [${entry.getHistoryEntryId()}] ` +
      `for value ${entry.getRequest().getRequestedValue()}, result [${entry.getResponse().getComputedResult()}]`,
    );
  }
}

import type { IFizzBuzzCommandHistoryEntry } from "./IFizzBuzzCommandHistoryManager.js";

export interface IFizzBuzzCommandVisitor {
  visitCommandHistoryEntry(entry: IFizzBuzzCommandHistoryEntry): void;
  getVisitorName(): string;
  getVisitorVersion(): string;
}

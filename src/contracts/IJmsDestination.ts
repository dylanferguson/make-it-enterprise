import type { JmsDestinationType } from "./JmsTypes.js";

export interface IJmsDestination {
  getDestinationName(): string;
  getDestinationType(): JmsDestinationType;
  getJndiName(): string;
  setJndiName(jndiName: string): void;
  getDescription(): string;
  toString(): string;
}

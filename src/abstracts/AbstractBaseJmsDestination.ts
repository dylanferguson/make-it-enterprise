import type { IJmsDestination } from "../contracts/IJmsDestination.js";
import type { JmsDestinationType } from "../contracts/JmsTypes.js";

export abstract class AbstractBaseJmsDestination implements IJmsDestination {
  private readonly destinationName: string;
  private readonly destinationType: JmsDestinationType;
  private jndiName: string;
  private readonly description: string;

  constructor(destinationName: string, destinationType: JmsDestinationType, jndiName: string, description: string) {
    this.destinationName = destinationName;
    this.destinationType = destinationType;
    this.jndiName = jndiName;
    this.description = description;
  }

  getDestinationName(): string { return this.destinationName; }
  getDestinationType(): JmsDestinationType { return this.destinationType; }
  getJndiName(): string { return this.jndiName; }
  setJndiName(jndiName: string): void { this.jndiName = jndiName; }
  getDescription(): string { return this.description; }

  toString(): string {
    return `${this.destinationType}[${this.destinationName}]@${this.jndiName}`;
  }
}

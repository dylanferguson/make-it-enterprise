import { AbstractBaseJmsMessage } from "../../abstracts/AbstractBaseJmsMessage.js";
import type { JmsMessageType } from "../../contracts/IJmsMessage.js";

export class EnterpriseJmsObjectMessageImpl extends AbstractBaseJmsMessage {
  private objectBody: object | null;

  constructor(body: object | null) {
    super("OBJECT");
    this.objectBody = body;
  }

  override getType(): JmsMessageType {
    return "OBJECT";
  }

  getObject(): object | null {
    return this.objectBody;
  }

  setObject(body: object): void {
    this.objectBody = body;
  }
}

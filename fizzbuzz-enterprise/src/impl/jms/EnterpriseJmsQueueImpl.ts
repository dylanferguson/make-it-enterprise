import { AbstractBaseJmsDestination } from "../../abstracts/AbstractBaseJmsDestination.js";

export class EnterpriseJmsQueueImpl extends AbstractBaseJmsDestination {
  constructor(queueName: string, jndiName: string, description: string) {
    super(queueName, "QUEUE", jndiName, description);
  }
}

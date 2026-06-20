import { AbstractBaseJmsDestination } from "../../abstracts/AbstractBaseJmsDestination.js";

export class EnterpriseJmsTopicImpl extends AbstractBaseJmsDestination {
  constructor(topicName: string, jndiName: string, description: string) {
    super(topicName, "TOPIC", jndiName, description);
  }
}

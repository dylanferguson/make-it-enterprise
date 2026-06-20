import { AbstractBaseJmsConnectionFactory } from "../../abstracts/AbstractBaseJmsConnectionFactory.js";
import type { IJmsConnection } from "../../contracts/IJmsConnection.js";
import { EnterpriseJmsConnectionImpl } from "./EnterpriseJmsConnectionImpl.js";

export class EnterpriseJmsConnectionFactoryImpl extends AbstractBaseJmsConnectionFactory {
  private static readonly FACTORY_NAME = "EnterpriseJmsConnectionFactory";
  private static readonly FACTORY_VERSION = "1.0.0-ENTERPRISE-JMS-CF";

  constructor() {
    super(EnterpriseJmsConnectionFactoryImpl.FACTORY_NAME, EnterpriseJmsConnectionFactoryImpl.FACTORY_VERSION);
  }

  override createConnection(): IJmsConnection {
    const connection = new EnterpriseJmsConnectionImpl(
      "EnterpriseJmsConnection",
      "1.0.0-ENTERPRISE-JMS-CONN",
    );
    if (this.getClientId()) {
      connection.setClientId(this.getClientId());
    }
    return connection;
  }

  override createConnectionWithCredentials(userName: string, password: string): IJmsConnection {
    const connection = new EnterpriseJmsConnectionImpl(
      "EnterpriseJmsConnection",
      "1.0.0-ENTERPRISE-JMS-CONN",
    );
    connection.setClientId(this.getClientId());
    if (connection.setStringProperty) {
      connection.setStringProperty("jms.userName", userName);
      connection.setStringProperty("jms.password", password);
    }
    return connection;
  }
}

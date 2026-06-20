import { AbstractBaseCorbaNamingService } from "../abstracts/AbstractBaseCorbaNamingService.js";

export class StandardCorbaNamingServiceImpl extends AbstractBaseCorbaNamingService {
  private static readonly NAMING_SERVICE_NAME = "StandardCorbaNamingService";
  private static readonly NAMING_SERVICE_VERSION = "1.0.0-CORBA-NAMING";
  private static readonly COS_NAMING_ROOT = "NameService";

  constructor() {
    super(
      StandardCorbaNamingServiceImpl.NAMING_SERVICE_NAME,
      StandardCorbaNamingServiceImpl.NAMING_SERVICE_VERSION,
    );
    this.bindings.set(StandardCorbaNamingServiceImpl.COS_NAMING_ROOT, this);
  }

  override resolve(name: string): unknown {
    const resolved = this.bindings.get(name);
    if (resolved === undefined) {
      throw new Error(
        `[${this.getNamingServiceName()}] CORBA name not found via CosNaming: ` +
        `name=[${name}], rootContext=[${StandardCorbaNamingServiceImpl.COS_NAMING_ROOT}], ` +
        `boundNames=[${this.list().join(", ")}]`,
      );
    }
    return resolved;
  }

  getRootContextName(): string {
    return StandardCorbaNamingServiceImpl.COS_NAMING_ROOT;
  }
}

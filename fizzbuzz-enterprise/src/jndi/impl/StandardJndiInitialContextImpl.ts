import { AbstractBaseJndiInitialContext } from "../abstracts/AbstractBaseJndiInitialContext.js";

export class StandardJndiInitialContextImpl extends AbstractBaseJndiInitialContext {
  private static readonly CONTEXT_NAME = "StandardJndiInitialContext";
  private static readonly CONTEXT_VERSION = "1.0.0-JNDI-INITIAL-CONTEXT";

  constructor() {
    super(
      StandardJndiInitialContextImpl.CONTEXT_NAME,
      StandardJndiInitialContextImpl.CONTEXT_VERSION,
    );
  }

  override lookup(name: string): unknown {
    if (!this.open) {
      throw new Error(
        `[${this.getInitialContextName()}] JNDI context is closed, cannot lookup: ${name}`,
      );
    }
    const binding = this.bindings.get(name);
    if (binding === undefined) {
      throw new Error(
        `[${this.getInitialContextName()}] JNDI name not found: ${name} ` +
        `(registered: [${this.getRegisteredBindingNames().join(", ")}])`,
      );
    }
    return binding;
  }
}

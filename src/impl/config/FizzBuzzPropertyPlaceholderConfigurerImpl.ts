import { AbstractBasePropertyPlaceholderConfigurer } from "../../abstracts/AbstractBasePropertyPlaceholderConfigurer.js";

export class FizzBuzzPropertyPlaceholderConfigurerImpl extends AbstractBasePropertyPlaceholderConfigurer {
  private static readonly CONFIGURER_NAME = "FizzBuzzPropertyPlaceholderConfigurer";

  constructor() {
    super(FizzBuzzPropertyPlaceholderConfigurerImpl.CONFIGURER_NAME);
    this.loadDefaultProperties();
  }

  loadDefaultProperties(): void {
    this.properties.set("fizzbuzz.application.name", "FizzBuzzEnterpriseEdition");
    this.properties.set("fizzbuzz.application.version", "2.0.0-ENTERPRISE");
    this.properties.set("fizzbuzz.cache.enabled", "true");
    this.properties.set("fizzbuzz.session.management.enabled", "true");
    this.properties.set("fizzbuzz.audit.trail.enabled", "true");
    this.properties.set("fizzbuzz.metrics.enabled", "true");
    this.properties.set("fizzbuzz.retry.count", "3");
    this.properties.set("fizzbuzz.retry.delay.ms", "0");
    this.properties.set("fizzbuzz.lifecycle.manager.enabled", "true");
    this.properties.set("fizzbuzz.resource.adapter.enabled", "true");
    this.properties.set("fizzbuzz.slo.target.latency.p99.ms", "50");
    this.properties.set("fizzbuzz.slo.target.availability", "0.999");
    this.properties.set("fizzbuzz.connection.pool.size", "10");
    this.properties.set("fizzbuzz.transaction.timeout.ms", "30000");
    this.properties.set("fizzbuzz.memento.history.size", "100");
    this.properties.set("fizzbuzz.deployment.descriptor.path", "/META-INF/fizzbuzz-deployment.xml");
  }
}

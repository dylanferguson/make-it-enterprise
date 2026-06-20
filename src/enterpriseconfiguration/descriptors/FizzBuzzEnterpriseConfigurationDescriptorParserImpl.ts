import type { IEnterpriseConfigurationDescriptorProperty, IEnterpriseConfigurationDescriptorNode, IEnterpriseConfigurationDescriptor } from "../contracts/IEnterpriseConfigurationDescriptor.js";

class EnterpriseConfigurationDescriptorPropertyImpl implements IEnterpriseConfigurationDescriptorProperty {
  private readonly propertyName: string;
  private readonly propertyValue: string;
  private readonly propertyType: string;

  constructor(name: string, value: string, type: string = "string") {
    this.propertyName = name;
    this.propertyValue = value;
    this.propertyType = type;
  }

  getName(): string { return this.propertyName; }
  getValue(): string { return this.propertyValue; }
  getType(): string { return this.propertyType; }
}

class EnterpriseConfigurationDescriptorNodeImpl implements IEnterpriseConfigurationDescriptorNode {
  private readonly nodeName: string;
  private readonly nodeValue: string | null;
  private readonly attributes: Record<string, string>;
  private readonly childNodes: IEnterpriseConfigurationDescriptorNode[];

  constructor(
    name: string,
    value: string | null = null,
    attributes: Record<string, string> = {},
    children: IEnterpriseConfigurationDescriptorNode[] = [],
  ) {
    this.nodeName = name;
    this.nodeValue = value;
    this.attributes = { ...attributes };
    this.childNodes = [...children];
  }

  getNodeName(): string { return this.nodeName; }
  getNodeValue(): string | null { return this.nodeValue; }
  getAttributes(): Record<string, string> { return { ...this.attributes }; }
  getAttribute(name: string): string | null { return this.attributes[name] ?? null; }
  getChildNodes(): readonly IEnterpriseConfigurationDescriptorNode[] { return [...this.childNodes]; }
  getChildNodesByName(name: string): readonly IEnterpriseConfigurationDescriptorNode[] {
    return this.childNodes.filter(n => n.getNodeName() === name);
  }
  getDescriptorName(): string { return this.nodeName; }
  getDescriptorVersion(): string { return this.attributes["version"] ?? "1.0.0"; }
}

export class FizzBuzzEnterpriseConfigurationDescriptorImpl implements IEnterpriseConfigurationDescriptor {
  private readonly rootNode: IEnterpriseConfigurationDescriptorNode;
  private readonly properties: IEnterpriseConfigurationDescriptorProperty[];
  private readonly source: string;
  private readonly schemaVersion: string;

  constructor(
    rootNode: IEnterpriseConfigurationDescriptorNode,
    properties: IEnterpriseConfigurationDescriptorProperty[],
    source: string = "META-INF/fizzbuzz-enterprise-config.xml",
    schemaVersion: string = "1.0.0",
  ) {
    this.rootNode = rootNode;
    this.properties = [...properties];
    this.source = source;
    this.schemaVersion = schemaVersion;
  }

  getRootNode(): IEnterpriseConfigurationDescriptorNode { return this.rootNode; }
  getProperties(): readonly IEnterpriseConfigurationDescriptorProperty[] { return [...this.properties]; }
  getProperty(name: string): IEnterpriseConfigurationDescriptorProperty | null {
    return this.properties.find(p => p.getName() === name) ?? null;
  }
  getDescriptorName(): string { return "FizzBuzzEnterpriseConfigurationDescriptor"; }
  getDescriptorVersion(): string { return "1.0.0-DESCRIPTOR"; }
  getDescriptorSource(): string { return this.source; }
  getSchemaVersion(): string { return this.schemaVersion; }
  isConfigurationValid(): boolean { return this.rootNode.getNodeName() === "fizzbuzz-enterprise-configuration"; }
}

export class FizzBuzzEnterpriseConfigurationDescriptorParserImpl {
  private static readonly PARSER_NAME = "FizzBuzzEnterpriseConfigurationDescriptorParserImpl";
  private static readonly PARSER_VERSION = "1.0.0-XML-PARSER";
  private static readonly SUPPORTED_SCHEMAS = ["1.0.0"];

  static parseDescriptor(descriptorSource: string): IEnterpriseConfigurationDescriptor {
    const properties: IEnterpriseConfigurationDescriptorProperty[] = [];
    const rootMatch = /<fizzbuzz-enterprise-configuration[^>]*>/i.exec(descriptorSource);
    if (!rootMatch) {
      return new FizzBuzzEnterpriseConfigurationDescriptorImpl(
        new EnterpriseConfigurationDescriptorNodeImpl("fizzbuzz-enterprise-configuration"),
        [],
        "inline",
      );
    }
    const rootMatchText = rootMatch[0];
    const schemaMatch = rootMatchText ? /schema-version\s*=\s*"([^"]*)"/i.exec(rootMatchText) : null;
    const schemaVersion = (schemaMatch && schemaMatch[1]) ? schemaMatch[1] : "1.0.0";
    const propertyRegex = /<property\s+name\s*=\s*"([^"]*)"\s+value\s*=\s*"([^"]*)"\s*(?:type\s*=\s*"([^"]*)")?\s*\/?>/g;
    let pm: RegExpExecArray | null;
    while ((pm = propertyRegex.exec(descriptorSource)) !== null) {
      const name = pm[1];
      const value = pm[2];
      const type = pm[3] ?? "string";
      if (name !== undefined && value !== undefined) {
        properties.push(new EnterpriseConfigurationDescriptorPropertyImpl(name, value, type));
      }
    }
    const decoratorChainMatch = /<decorator-chain[^>]*>([\s\S]*?)<\/decorator-chain>/i.exec(descriptorSource);
    let chainChildren: IEnterpriseConfigurationDescriptorNode[] = [];
    if (decoratorChainMatch && decoratorChainMatch[1] !== undefined) {
      const chainContent: string = decoratorChainMatch[1];
      const decoratorRegex = /<decorator\s+name\s*=\s*"([^"]*)"\s+enabled\s*=\s*"([^"]*)"\s*\/?>/g;
      let dm: RegExpExecArray | null;
      while ((dm = decoratorRegex.exec(chainContent)) !== null) {
        const decoratorName = dm[1];
        const decoratorEnabled = dm[2];
        if (decoratorName !== undefined && decoratorEnabled !== undefined) {
          chainChildren.push(new EnterpriseConfigurationDescriptorNodeImpl(
            "decorator",
            null,
            { name: decoratorName, enabled: decoratorEnabled },
          ));
        }
      }
    }
    const mediationMatch = /<mediation-configuration[^>]*>([\s\S]*?)<\/mediation-configuration>/i.exec(descriptorSource);
    let mediationChildren: IEnterpriseConfigurationDescriptorNode[] = [];
    if (mediationMatch && mediationMatch[1] !== undefined) {
      const mediationContent: string = mediationMatch[1];
      const handlerRegex = /<handler\s+name\s*=\s*"([^"]*)"\s+enabled\s*=\s*"([^"]*)"\s+priority\s*=\s*"([^"]*)"\s*\/?>/g;
      let hm: RegExpExecArray | null;
      while ((hm = handlerRegex.exec(mediationContent)) !== null) {
        const handlerName = hm[1];
        const handlerEnabled = hm[2];
        const handlerPriority = hm[3];
        if (handlerName !== undefined && handlerEnabled !== undefined && handlerPriority !== undefined) {
          mediationChildren.push(new EnterpriseConfigurationDescriptorNodeImpl(
            "handler",
            null,
            { name: handlerName, enabled: handlerEnabled, priority: handlerPriority },
          ));
        }
      }
    }
    const rootChildren: IEnterpriseConfigurationDescriptorNode[] = [];
    if (chainChildren.length > 0) {
      rootChildren.push(new EnterpriseConfigurationDescriptorNodeImpl(
        "decorator-chain", null, {}, chainChildren,
      ));
    }
    if (mediationChildren.length > 0) {
      rootChildren.push(new EnterpriseConfigurationDescriptorNodeImpl(
        "mediation-configuration", null, {}, mediationChildren,
      ));
    }
    const rootNode = new EnterpriseConfigurationDescriptorNodeImpl(
      "fizzbuzz-enterprise-configuration",
      null,
      { "schema-version": schemaVersion, "xmlns": "http://com.enterprise.fizzbuzz/schema/enterprise-configuration" },
      rootChildren,
    );
    return new FizzBuzzEnterpriseConfigurationDescriptorImpl(rootNode, properties, "inline", schemaVersion);
  }

  static parseDescriptorFromPath(filePath: string): IEnterpriseConfigurationDescriptor {
    try {
      const fs = require("fs");
      const xmlContent: string = fs.readFileSync(filePath, "utf-8");
      return FizzBuzzEnterpriseConfigurationDescriptorParserImpl.parseDescriptor(xmlContent);
    } catch {
      console.warn(
        `[${FizzBuzzEnterpriseConfigurationDescriptorParserImpl.PARSER_NAME} v${FizzBuzzEnterpriseConfigurationDescriptorParserImpl.PARSER_VERSION}] ` +
        `Configuration descriptor not found at path=[${filePath}], returning default configuration`,
      );
      return FizzBuzzEnterpriseConfigurationDescriptorParserImpl.createDefaultDescriptor();
    }
  }

  static createDefaultDescriptor(): IEnterpriseConfigurationDescriptor {
    const defaultProperties = [
      new EnterpriseConfigurationDescriptorPropertyImpl("mediation.enabled", "true", "boolean"),
      new EnterpriseConfigurationDescriptorPropertyImpl("auditing.enabled", "true", "boolean"),
      new EnterpriseConfigurationDescriptorPropertyImpl("performance.monitoring.enabled", "true", "boolean"),
      new EnterpriseConfigurationDescriptorPropertyImpl("validation.enabled", "true", "boolean"),
      new EnterpriseConfigurationDescriptorPropertyImpl("metrics.collection.enabled", "true", "boolean"),
      new EnterpriseConfigurationDescriptorPropertyImpl("decorator.configuration.aware.enabled", "true", "boolean"),
      new EnterpriseConfigurationDescriptorPropertyImpl("decorator.validation.aware.enabled", "true", "boolean"),
      new EnterpriseConfigurationDescriptorPropertyImpl("decorator.interception.filter.enabled", "true", "boolean"),
      new EnterpriseConfigurationDescriptorPropertyImpl("decorator.document.aware.enabled", "true", "boolean"),
      new EnterpriseConfigurationDescriptorPropertyImpl("decorator.aop.aware.enabled", "true", "boolean"),
      new EnterpriseConfigurationDescriptorPropertyImpl("decorator.pre.evaluation.enabled", "true", "boolean"),
      new EnterpriseConfigurationDescriptorPropertyImpl("decorator.state.machine.enabled", "true", "boolean"),
      new EnterpriseConfigurationDescriptorPropertyImpl("decorator.transaction.enabled", "true", "boolean"),
      new EnterpriseConfigurationDescriptorPropertyImpl("decorator.abstract.divisibility.enabled", "true", "boolean"),
      new EnterpriseConfigurationDescriptorPropertyImpl("decorator.jndi.ejb.enabled", "true", "boolean"),
      new EnterpriseConfigurationDescriptorPropertyImpl("decorator.post.processor.enabled", "true", "boolean"),
      new EnterpriseConfigurationDescriptorPropertyImpl("decorator.strategy.lookup.enabled", "true", "boolean"),
      new EnterpriseConfigurationDescriptorPropertyImpl("decorator.orchestration.mediation.enabled", "true", "boolean"),
    ];
    const rootNode = new EnterpriseConfigurationDescriptorNodeImpl(
      "fizzbuzz-enterprise-configuration",
      null,
      { "schema-version": "1.0.0", "xmlns": "http://com.enterprise.fizzbuzz/schema/enterprise-configuration" },
      [
        new EnterpriseConfigurationDescriptorNodeImpl("decorator-chain", null, {}, [
          new EnterpriseConfigurationDescriptorNodeImpl("decorator", null, { name: "ConfigurationAware", enabled: "true" }),
          new EnterpriseConfigurationDescriptorNodeImpl("decorator", null, { name: "ValidationAware", enabled: "true" }),
          new EnterpriseConfigurationDescriptorNodeImpl("decorator", null, { name: "InterceptionFilter", enabled: "true" }),
          new EnterpriseConfigurationDescriptorNodeImpl("decorator", null, { name: "DocumentAware", enabled: "true" }),
          new EnterpriseConfigurationDescriptorNodeImpl("decorator", null, { name: "AopAware", enabled: "true" }),
          new EnterpriseConfigurationDescriptorNodeImpl("decorator", null, { name: "PreEvaluation", enabled: "true" }),
          new EnterpriseConfigurationDescriptorNodeImpl("decorator", null, { name: "StateMachine", enabled: "true" }),
          new EnterpriseConfigurationDescriptorNodeImpl("decorator", null, { name: "Transaction", enabled: "true" }),
          new EnterpriseConfigurationDescriptorNodeImpl("decorator", null, { name: "AbstractDivisibility", enabled: "true" }),
          new EnterpriseConfigurationDescriptorNodeImpl("decorator", null, { name: "JndiEjb", enabled: "true" }),
          new EnterpriseConfigurationDescriptorNodeImpl("decorator", null, { name: "PostProcessor", enabled: "true" }),
          new EnterpriseConfigurationDescriptorNodeImpl("decorator", null, { name: "StrategyLookupService", enabled: "true" }),
          new EnterpriseConfigurationDescriptorNodeImpl("decorator", null, { name: "OrchestrationMediation", enabled: "true" }),
        ]),
        new EnterpriseConfigurationDescriptorNodeImpl("mediation-configuration", null, {}, [
          new EnterpriseConfigurationDescriptorNodeImpl("handler", null, { name: "AuditingHandler", enabled: "true", priority: "100" }),
          new EnterpriseConfigurationDescriptorNodeImpl("handler", null, { name: "PerformanceMonitoringHandler", enabled: "true", priority: "200" }),
          new EnterpriseConfigurationDescriptorNodeImpl("handler", null, { name: "ValidationHandler", enabled: "true", priority: "300" }),
          new EnterpriseConfigurationDescriptorNodeImpl("handler", null, { name: "MetricCollectionHandler", enabled: "true", priority: "400" }),
        ]),
      ],
    );
    return new FizzBuzzEnterpriseConfigurationDescriptorImpl(rootNode, defaultProperties);
  }

  static getParserName(): string { return FizzBuzzEnterpriseConfigurationDescriptorParserImpl.PARSER_NAME; }
  static getParserVersion(): string { return FizzBuzzEnterpriseConfigurationDescriptorParserImpl.PARSER_VERSION; }
  static getSupportedSchemaVersions(): readonly string[] { return ["1.0.0"]; }
}

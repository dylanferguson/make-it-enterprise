import type { IEjbDeploymentDescriptor, IEjbEntityBeanDescriptor, IEjbFinderMethodDescriptor } from "../../contracts/IEjbDeploymentDescriptor.js";

export class EjbJarDeploymentDescriptorImpl implements IEjbDeploymentDescriptor {
  private static readonly DESCRIPTOR_NAME = "ejb-jar.xml";
  private static readonly DESCRIPTOR_VERSION = "2.1-ENTERPRISE";

  private readonly entityBeanDescriptors: Map<string, IEjbEntityBeanDescriptor> = new Map();
  private readonly finderMethodDescriptors: Map<string, IEjbFinderMethodDescriptor[]> = new Map();
  private readonly containerManagedFields: Map<string, string[]> = new Map();
  private readonly queryMappings: Map<string, string> = new Map();
  private readonly transactionAttributes: Map<string, string> = new Map();
  private readonly beanManagedPersistence: Set<string> = new Set();

  constructor() {
    this.registerDefaultDescriptors();
  }

  getDescriptorName(): string {
    return EjbJarDeploymentDescriptorImpl.DESCRIPTOR_NAME;
  }

  getDescriptorVersion(): string {
    return EjbJarDeploymentDescriptorImpl.DESCRIPTOR_VERSION;
  }

  getEntityBeanNames(): readonly string[] {
    return Array.from(this.entityBeanDescriptors.keys());
  }

  getEntityBeanDescriptor(beanName: string): IEjbEntityBeanDescriptor | null {
    return this.entityBeanDescriptors.get(beanName) ?? null;
  }

  getContainerManagedFields(beanName: string): readonly string[] {
    return this.containerManagedFields.get(beanName) ?? [];
  }

  getFinderMethods(beanName: string): readonly IEjbFinderMethodDescriptor[] {
    return this.finderMethodDescriptors.get(beanName) ?? [];
  }

  getQueryForFinderMethod(beanName: string, methodName: string): string | null {
    const key = `${beanName}.${methodName}`;
    return this.queryMappings.get(key) ?? null;
  }

  getTransactionAttribute(beanName: string, methodName: string): string {
    const key = `${beanName}.${methodName}`;
    return this.transactionAttributes.get(key) ?? "Required";
  }

  isBeanManagedPersistence(beanName: string): boolean {
    return this.beanManagedPersistence.has(beanName);
  }

  registerEntityBeanDescriptor(descriptor: IEjbEntityBeanDescriptor): void {
    this.entityBeanDescriptors.set(descriptor.beanName, descriptor);
    this.containerManagedFields.set(descriptor.beanName, [...descriptor.cmpFields]);
    console.debug(
      `[${EjbJarDeploymentDescriptorImpl.DESCRIPTOR_NAME}] Entity bean registered: ${descriptor.beanName}`,
    );
  }

  registerFinderMethodDescriptor(beanName: string, descriptor: IEjbFinderMethodDescriptor): void {
    const existing = this.finderMethodDescriptors.get(beanName) ?? [];
    existing.push(descriptor);
    this.finderMethodDescriptors.set(beanName, existing);
    const queryKey = `${beanName}.${descriptor.methodName}`;
    this.queryMappings.set(queryKey, descriptor.query);
    console.debug(
      `[${EjbJarDeploymentDescriptorImpl.DESCRIPTOR_NAME}] Finder method registered: ${queryKey}`,
    );
  }

  setTransactionAttribute(beanName: string, methodName: string, attribute: string): void {
    const key = `${beanName}.${methodName}`;
    this.transactionAttributes.set(key, attribute);
  }

  markBeanManagedPersistence(beanName: string): void {
    this.beanManagedPersistence.add(beanName);
  }

  private registerDefaultDescriptors(): void {
    const fizzBuzzDescriptor: IEjbEntityBeanDescriptor = {
      beanName: "FizzBuzzValue",
      beanClass: "FizzBuzzEntityBeanImpl",
      homeInterface: "IFizzBuzzEntityHome",
      remoteInterface: "FizzBuzzEntityEJBObject",
      localHomeInterface: "IFizzBuzzEntityLocalHome",
      localInterface: "FizzBuzzEntityEJBLocalObject",
      persistenceType: "Container",
      primaryKeyClass: "java.lang.Integer",
      reentrant: false,
      abstractSchemaName: "FizzBuzzValue",
      cmpFields: ["value", "result", "createdTimestamp"],
    };
    this.registerEntityBeanDescriptor(fizzBuzzDescriptor);

    this.registerFinderMethodDescriptor("FizzBuzzValue", {
      methodName: "findAll",
      query: "FIND ALL OBJECT(FizzBuzzValue)",
      returnType: "java.util.Collection",
      params: [],
    });

    this.registerFinderMethodDescriptor("FizzBuzzValue", {
      methodName: "findByValue",
      query: "FIND OBJECT(FizzBuzzValue) BY value",
      returnType: "FizzBuzzValue",
      params: ["value"],
    });

    this.registerFinderMethodDescriptor("FizzBuzzValue", {
      methodName: "findByResultContaining",
      query: "FIND OBJECT(FizzBuzzValue) BY result",
      returnType: "java.util.Collection",
      params: ["result"],
    });

    this.registerFinderMethodDescriptor("FizzBuzzValue", {
      methodName: "findByResultRange",
      query: "FIND OBJECT(FizzBuzzValue) BY range",
      returnType: "java.util.Collection",
      params: ["minValue", "maxValue"],
    });

    const transactionMethods = ["findAll", "findByValue", "findByResultContaining", "findByResultRange", "create", "remove"];
    for (const method of transactionMethods) {
      this.setTransactionAttribute("FizzBuzzValue", method, "Required");
    }
  }
}

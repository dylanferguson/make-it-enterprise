export interface IEjbDeploymentDescriptor {
  getDescriptorName(): string;
  getDescriptorVersion(): string;
  getEntityBeanNames(): readonly string[];
  getEntityBeanDescriptor(beanName: string): IEjbEntityBeanDescriptor | null;
  getContainerManagedFields(beanName: string): readonly string[];
  getFinderMethods(beanName: string): readonly IEjbFinderMethodDescriptor[];
  getQueryForFinderMethod(beanName: string, methodName: string): string | null;
  getTransactionAttribute(beanName: string, methodName: string): string;
  isBeanManagedPersistence(beanName: string): boolean;
}

export interface IEjbEntityBeanDescriptor {
  beanName: string;
  beanClass: string;
  homeInterface: string;
  remoteInterface: string;
  localHomeInterface: string;
  localInterface: string;
  persistenceType: string;
  primaryKeyClass: string;
  reentrant: boolean;
  abstractSchemaName: string;
  cmpFields: readonly string[];
}

export interface IEjbFinderMethodDescriptor {
  methodName: string;
  query: string;
  returnType: string;
  params: readonly string[];
}

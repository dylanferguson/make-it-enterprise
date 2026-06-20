import type { IBusinessDelegateLookupService } from "../../contracts/IBusinessDelegateLookupService.js";
import type { IFizzBuzzServiceDelegate } from "../../contracts/IFizzBuzzServiceDelegate.js";
import { BusinessDelegateLookupServiceImpl } from "../lookup/BusinessDelegateLookupServiceImpl.js";

export class BusinessDelegateLookupServiceFactoryBean {
  private static readonly FACTORY_BEAN_NAME = "BusinessDelegateLookupServiceFactoryBean";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-LOOKUP-FACTORY";
  private static readonly DEFAULT_DELEGATE_JNDI_NAME = "java:comp/env/fizzbuzz/DefaultEnterpriseServiceDelegate";

  private readonly delegateJndiName: string;
  private readonly delegate: IFizzBuzzServiceDelegate;
  private lookupService: IBusinessDelegateLookupService | null = null;

  constructor(delegateJndiName: string, delegate: IFizzBuzzServiceDelegate) {
    this.delegateJndiName = delegateJndiName;
    this.delegate = delegate;
  }

  createLookupService(): IBusinessDelegateLookupService {
    if (this.lookupService === null) {
      this.lookupService = new BusinessDelegateLookupServiceImpl();
      this.lookupService.registerDelegate(this.delegateJndiName, this.delegate);
    }
    return this.lookupService;
  }

  getFactoryBeanName(): string {
    return BusinessDelegateLookupServiceFactoryBean.FACTORY_BEAN_NAME;
  }

  getFactoryBeanVersion(): string {
    return BusinessDelegateLookupServiceFactoryBean.FACTORY_BEAN_VERSION;
  }

  getDelegateJndiName(): string {
    return this.delegateJndiName;
  }

  static createLookupServiceFactoryBean(
    delegate: IFizzBuzzServiceDelegate,
    delegateJndiName: string = BusinessDelegateLookupServiceFactoryBean.DEFAULT_DELEGATE_JNDI_NAME,
  ): BusinessDelegateLookupServiceFactoryBean {
    return new BusinessDelegateLookupServiceFactoryBean(delegateJndiName, delegate);
  }
}

import { BaseInterfaceRepository } from "../common/core/interface/base.interface.repository";
import { Customer } from "./entities/customer.entity";

export interface CustomerRepositoryInterface extends BaseInterfaceRepository<Customer> {}
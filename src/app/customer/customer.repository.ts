import { InjectRepository } from "@nestjs/typeorm";
import { BaseAbstractRepostitory } from "../common/core/repository/base.repository";
import { CustomerRepositoryInterface } from "./customer.interface";
import { Customer } from "./entities/customer.entity";
import { Repository } from "typeorm";


export class CustomerRepository extends BaseAbstractRepostitory<Customer> implements CustomerRepositoryInterface {
    constructor(@InjectRepository(Customer) private readonly customerRepository: Repository<Customer>) {
        super(customerRepository)
    }
}
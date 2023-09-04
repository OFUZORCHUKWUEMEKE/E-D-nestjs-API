import { Injectable } from '@nestjs/common';
import { CreateCustomer } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerRepository } from './customer.repository';

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository,) { }
  async findAll() {
    const customers = await this.customerRepository.findAll()
    return customers
  }

  async findOne(businessname: string) {
    return await this.customerRepository.getCustomerByBusiness(businessname)
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}

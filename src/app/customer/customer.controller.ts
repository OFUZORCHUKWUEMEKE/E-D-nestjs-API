import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomer } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';

@ApiTags('customers')
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService, @InjectRepository(Customer) private readonly customerRepository: Repository<Customer>) { }

  @Get('/')
  async findAll(): Promise<Customer[]> {
    return await this.customerService.findAll()
  }

  @Get('/:businessname')
  async FindOne(@Param('businessname') businessname: string) {
    return this.customerService.findOne(businessname)
  }


}

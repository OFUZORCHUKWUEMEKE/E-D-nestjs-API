import { Injectable } from '@nestjs/common';
import { CreateCustomer } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerRepository } from './customer.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { DataSource, Repository } from 'typeorm';
import { Ireq } from '../auth/dto/auth.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository, @InjectRepository(Customer) private readonly customerRepo: Repository<Customer>, private readonly cloudinaryService: CloudinaryService) { }
  async findAll() {
    const customers = await this.customerRepository.findAll()
    return customers
  }

  async findOne(businessname: string) {
    return await this.customerRepository.getCustomerByBusiness(businessname)
  }

  async updateProfile(body, req) {

    const payload: Ireq = req.user

    if (body.profilepicture) {
      const url = await this.cloudinaryService.uploadImage(body.profilepicture)
      body.profilepicture = url.url
      return await this.customerRepo.update({ id: payload.userId }, body)
    }

    return await this.customerRepo.update({ id: payload.userId }, body)
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}

import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { CustomerProvider } from './customer.provider';
import { DatabaseModule } from '../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Customer } from './entities/customer.entity';
import { CustomerRepository } from './customer.repository';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
@Module({
  imports: [TypeOrmModule.forFeature([Customer]),CloudinaryModule],
  controllers: [CustomerController],
  providers: [CustomerService,CustomerRepository],
  exports:[CustomerRepository]
})
export class CustomerModule {}

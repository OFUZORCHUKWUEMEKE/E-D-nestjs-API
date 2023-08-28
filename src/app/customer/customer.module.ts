import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { CustomerProvider } from './customer.provider';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports:[DatabaseModule],
  controllers: [CustomerController],
  providers: [CustomerService,...CustomerProvider],
})
export class CustomerModule {}

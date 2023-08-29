import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { CustomerProvider } from './customer.provider';
import { DatabaseModule } from '../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Customer } from './entities/customer.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}

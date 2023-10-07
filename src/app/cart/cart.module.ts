import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { CartRepository } from './cart.repository';
import { Customer } from '../customer/entities/customer.entity';
import { CustomerModule } from '../customer/customer.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cart,Customer]),CustomerModule],
  providers: [CartService, CartRepository],
  controllers: [CartController],
  exports:[CartRepository]
})
export class CartModule { }

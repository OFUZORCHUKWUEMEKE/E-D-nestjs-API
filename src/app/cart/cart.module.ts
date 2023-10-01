import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { CartRepository } from './cart.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Cart])],
  providers: [CartService, CartRepository],
  controllers: [CartController]
})
export class CartModule { }

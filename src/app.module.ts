import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './app/auth/auth.module';
import { ProductModule } from './app/product/product.module';
import { CustomerModule } from './app/customer/customer.module';
import { OrdersModule } from './app/orders/orders.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './app/common/config/config';
import { DatabaseModule } from './app/database/database.module';
import { CartService } from './app/cart/cart.service';
import { CartModule } from './app/cart/cart.module';
import { CouponModule } from './app/coupon/coupon.module';
import { CloudinaryModule } from './app/cloudinary/cloudinary.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Customer } from './app/customer/entities/customer.entity';
import { Order } from './app/orders/entities/order.entity';
import { Product } from './app/product/entities/product.entity';
import path from 'path';


@Module({
  imports: [AuthModule, ProductModule, CustomerModule, OrdersModule, ConfigModule.forRoot({
    load: [configuration],
    isGlobal: true
  }), TypeOrmModule.forRootAsync({
    useFactory: () => {
      const config = configuration()
      return {
        type: 'postgres',
        url: config.POSTGRES_URL,
        autoLoadEntities: true,
        synchronize: true,
        host: 'localhost',
        entities:[
           Customer,Product,Order
        ]
      }
    }
  }), CartModule, CouponModule, CloudinaryModule],
  controllers: [AppController],
  providers: [AppService, CartService],
})
export class AppModule {}

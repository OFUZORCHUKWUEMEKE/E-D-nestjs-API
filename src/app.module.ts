import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './app/auth/auth.module';
import { ProductModule } from './app/product/product.module';
import { CustomerModule } from './app/customer/customer.module';
import { OrdersModule } from './app/orders/orders.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './app/common/config/config';


@Module({
  imports: [AuthModule, ProductModule, CustomerModule, OrdersModule, ConfigModule.forRoot({
    load: [configuration],
    isGlobal: true
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

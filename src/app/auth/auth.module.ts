import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '../customer/entities/customer.entity';
import { DatabaseModule } from '../database/database.module';
import { CustomerProvider } from '../customer/customer.provider';
import { CustomerModule } from '../customer/customer.module';

@Module({
  imports: [CloudinaryModule, CustomerModule,TypeOrmModule.forFeature([Customer])],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}

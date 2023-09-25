import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '../customer/entities/customer.entity';
import { DatabaseModule } from '../database/database.module';
import { CustomerProvider } from '../customer/customer.provider';
import { CustomerModule } from '../customer/customer.module';
import { JwtModule } from '@nestjs/jwt';
import configuration from '../common/config/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';
import { WalletModule } from '../wallet/wallet.module';
import { Wallet } from '../wallet/wallet.entity';

const config = configuration()

@Module({
  imports: [CloudinaryModule, CustomerModule, TypeOrmModule.forFeature([Customer,Wallet]), JwtModule.register({
    global: true,
    secret: config.JWT_SECRET,
    signOptions: {
      expiresIn: '20d'
    }
  }),PassportModule,WalletModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}

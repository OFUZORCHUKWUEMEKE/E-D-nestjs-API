import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { WalletRepository } from './wallet.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './wallet.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Wallet])],
  providers: [WalletService,WalletRepository],
  controllers: [WalletController],
  exports: [WalletService, WalletRepository],
  
})
export class WalletModule {}

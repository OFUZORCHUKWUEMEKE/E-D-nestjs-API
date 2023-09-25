import { Injectable } from '@nestjs/common';
import { WalletRepository } from './wallet.repository';
import { Wallet } from './wallet.entity';

@Injectable()
export class WalletService {
    constructor(private readonly walletRepository: WalletRepository) { }
    async CreateWallet(payload: Partial<Wallet>) {
        await this.walletRepository.create(payload)
    }
}

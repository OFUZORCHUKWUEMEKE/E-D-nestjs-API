import { InjectRepository } from "@nestjs/typeorm";
import { BaseAbstractRepostitory } from "../common/core/repository/base.repository";

import { Repository } from "typeorm";
import { WalletRepositoryInterface } from "./wallet.interface";
import { Wallet } from "./wallet.entity";


export class WalletRepository extends BaseAbstractRepostitory<Wallet> implements WalletRepositoryInterface {
    constructor(@InjectRepository(Wallet) private readonly walletRepository: Repository<Wallet>) {
        super(walletRepository)
    }

}
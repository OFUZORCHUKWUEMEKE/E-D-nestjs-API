import { BaseInterfaceRepository } from "../common/core/interface/base.interface.repository";
import { Wallet } from "./wallet.entity";

export interface WalletRepositoryInterface extends BaseInterfaceRepository<Wallet> {}
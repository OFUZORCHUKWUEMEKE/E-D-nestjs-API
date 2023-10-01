import { BaseInterfaceRepository } from "../common/core/interface/base.interface.repository";
import { Cart } from "./entities/cart.entity";

export interface CartRepositoryInterface extends BaseInterfaceRepository<Cart> {}
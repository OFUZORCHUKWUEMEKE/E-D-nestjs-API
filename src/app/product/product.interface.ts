import { BaseInterfaceRepository } from "../common/core/interface/base.interface.repository";
import { Product } from "./entities/product.entity";


export interface ProductRepositoryInterface extends BaseInterfaceRepository<Product>{}
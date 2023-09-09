import { PartialType } from '@nestjs/swagger'
import { CreateProduct } from './create-product'

export class UpdateProduct extends PartialType(CreateProduct) {}
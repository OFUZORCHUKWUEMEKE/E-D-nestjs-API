import { BaseEntity } from "src/app/common/core/entity/base.entity"
import { Column, Entity } from "typeorm"



@Entity('product_type')
export class ProductType extends BaseEntity {
    @Column({unique:true,nullable:false})
    name: string

    @Column({nullable:false})
    price: number

    @Column({nullable:false})
    description: string

    @Column({nullable:false})
    quantity: number

}
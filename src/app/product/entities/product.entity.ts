import { BaseEntity } from "src/app/common/core/entity/base.entity";
import { Customer } from "src/app/customer/entities/customer.entity";
import { Order } from "src/app/orders/entities/order.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { ProductType } from "./producttype.entity";




@Entity('product')
export class Product extends BaseEntity {
    @Column()
    description: string

    @Column({ default: true })
    availability: boolean

    @Column({ default: 0, })
    quantity_per_crate: number

    @OneToOne(() => ProductType)
    @JoinColumn()
    productType: ProductType
}




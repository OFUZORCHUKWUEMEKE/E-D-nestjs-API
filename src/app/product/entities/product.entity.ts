import { BaseEntity } from "src/app/common/core/entity/base.entity";
import { Order } from "src/app/orders/entities/order.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity('product')
export class Product extends BaseEntity {
    @Column()
    description: string

    @Column()
    type: ''

    @Column()
    availability: boolean

    @Column()
    coupon: string

    @Column()
    quantity: number

    @OneToMany(()=>Order,(order)=>order.product)
    order:Order[]
}
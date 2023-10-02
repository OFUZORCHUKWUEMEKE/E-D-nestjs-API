import { BaseEntity } from "src/app/common/core/entity/base.entity";
import { Customer } from "src/app/customer/entities/customer.entity";
import { Order } from "src/app/orders/entities/order.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

@Entity('product')
export class Product extends BaseEntity {
    @Column()
    description: string

    @Column({ default: false })
    availability: boolean

    @Column({ default: 0, })
    quantity_per_crate: number

    @OneToMany(() => Order, (order) => order.product)
    order: Order[]
}

@Entity('product_type')
export class ProductType extends BaseEntity {
    @Column({})
    name: string

    @Column()
    price: number

    @Column()
    description: string

}


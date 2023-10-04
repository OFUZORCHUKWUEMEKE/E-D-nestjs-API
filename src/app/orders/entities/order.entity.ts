import { Column, Entity, OneToOne, PrimaryColumn, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { OrderStatus } from "../dto/order-status.enum";
import { Customer } from "src/app/customer/entities/customer.entity";
import { BaseEntity } from "src/app/common/core/entity/base.entity";
import { Product } from "src/app/product/entities/product.entity";

@Entity('order')
export class Order extends BaseEntity {

    @Column()
    order_id: string

    @OneToMany(() => Product, (product) => product.id)
    product: Product[]

    @Column({ enum: OrderStatus, default: OrderStatus.PENDING })
    orderstatus: OrderStatus

    @OneToOne(() => Customer, (customer) => customer.order)
    @JoinColumn()
    customer: Customer
}

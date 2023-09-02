import { BaseEntity } from "src/app/common/core/entity/base.entity";
import { CustomerType, DailyLimit, SubscriptionType } from "src/app/common/dto/common-dto";
import { Order } from "src/app/orders/entities/order.entity";
import { Entity, Column, OneToMany } from "typeorm";

@Entity('customer')
export class Customer extends BaseEntity {

    @Column({ nullable: false })
    firstname: string

    @Column({ nullable: false })
    lastname: string

    @Column({ unique: true, nullable: false })
    businessname: string

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @Column({ nullable: true })
    profilepicture: string

    @Column({ enum: DailyLimit, default: DailyLimit.BASIC })
    dailylimit: DailyLimit

    @Column({ default: CustomerType.REGULAR, enum: CustomerType })
    customertype: CustomerType

    @Column({ default: false })
    isverified: boolean

    @Column({ nullable: true })
    token: string

    @Column({ enum: SubscriptionType, default: SubscriptionType.BASIC })
    subscription: SubscriptionType

    @OneToMany(() => Order, (order) => order.customer)
    order: Order[]

}

import { Exclude } from "class-transformer";
import { Cart } from "src/app/cart/entities/cart.entity";
import { BaseEntity } from "src/app/common/core/entity/base.entity";
import { CustomerStatus, CustomerType, DailyLimit, SubscriptionType } from "src/app/common/dto/common-dto";
import { Order } from "src/app/orders/entities/order.entity";
import { Wallet } from "src/app/wallet/wallet.entity";
import { Entity, Column, OneToMany, JoinColumn, OneToOne } from "typeorm";

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
    @Exclude()
    password: string

    @Column({ nullable: true })
    profilepicture: string

    @Column({ enum: DailyLimit, default: DailyLimit.BASIC })
    dailylimit: DailyLimit

    @Column({ default: CustomerType.REGULAR, enum: CustomerType })
    customertype: CustomerType

    @Column({ default: CustomerStatus.INACTIVE, enum: CustomerStatus })
    activate: CustomerStatus

    @Column({ nullable: true })
    // @Exclude()
    token: string

    @Column({ enum: SubscriptionType, default: SubscriptionType.BASIC })
    subscription: SubscriptionType

    @OneToMany(() => Order, (order) => order.customer)
    order: Order[]

    @OneToOne(() => Cart, (cart) => cart.customer)
    cart: Cart

    // @OneToOne(() => Wallet, (wallet) => wallet.id, { cascade: true })
    // wallet: Wallet

    // @OneToOne(() => Cart, (cart) => cart.id, { cascade: true })
    // cart: Cart

}

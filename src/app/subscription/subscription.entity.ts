import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { BaseEntity } from "../common/core/entity/base.entity";
import { SubscriptionType } from "./subscription.dto";
import { Customer } from "../customer/entities/customer.entity";

@Entity('subscription')
export class Subscription extends BaseEntity {
    @Column({ enum: SubscriptionType , default:SubscriptionType.BASIC})
    type: SubscriptionType

    @OneToOne(()=>Customer)
    @JoinColumn()
    customer:Customer
}
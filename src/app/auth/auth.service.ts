import { Injectable, HttpException, BadRequestException, ConflictException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { CreateCustomer } from '../customer/dto/create-customer.dto';
import { Ilogin, Ireq } from './dto/auth.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Customer } from '../customer/entities/customer.entity';
import { DeepPartial, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { CustomerStatus, Db_Constants } from '../common/dto/common-dto';
import { comparepassword, hashpassword } from '../common/utils/functions';
import { JwtService } from '@nestjs/jwt';
import { CustomerRepository } from '../customer/customer.repository';
import { GenerateToken, verifyToken } from '../utils/functions';
import * as jwt from 'jsonwebtoken'
import { error } from 'console';
import { ValidationError } from 'class-validator';
import * as bcrypt from 'bcrypt'
import { WalletService } from '../wallet/wallet.service';
import { CartRepository } from '../cart/cart.repository';
import { SubscriptionRepository } from '../subscription/subscription.repository';


@Injectable()
export class AuthService {
    constructor(private cloudinaryService: CloudinaryService, private readonly jwtService: JwtService, private readonly customerRepository: CustomerRepository, private walletService: WalletService, private readonly cartRepository: CartRepository,private readonly subscritionRepository:SubscriptionRepository) { }
    async SignUp(body: CreateCustomer) {
        try {
            const customer = new Customer()
            if (body.profilepicture) {
                const image_url = await this.cloudinaryService.uploadImage(body.profilepicture)
                body.profilepicture = image_url.url
            }
            const isActive = await this.customerRepository.findOne({
                where: [
                    { businessname: body.businessname },
                    { email: body.email }
                ]
            })
            if (isActive)
                throw new BadRequestException("Customer Already Exists")
            for (const [key, value] of Object.entries(body)) {
                customer[key] = value
            }
            const hashpass = await hashpassword(body.password)
            customer.password = hashpass
            customer.customertype = body.customertype

            const token = await GenerateToken(customer.id, customer.email)

            const newWallet = await this.walletService.create({
                customer: customer, amount: 0
            })

            const cart = await this.cartRepository.create({
                customer, product: []
            })

            console.log(newWallet)

            customer.token = token

            const save = await this.customerRepository.save(customer)

            const newSubscription = this.subscritionRepository.create({
                customer:customer
            })

            return {
                token, save
            }

        } catch (error) {
            console.log(error)
            throw new HttpException(error.response, 400)
        }
    }
    async Login(body) {
        const { email, password } = body
        try {
            const customer = await this.customerRepository.findOne({
                where: {
                    email
                }
            })

            if (!customer)
                throw new ConflictException("Invalid Customer Credentials")

            const isValidPassword = comparepassword(password, await (customer.password))

            if (!isValidPassword)
                throw new ConflictException('Invalid Customer Credentials')

            if (customer.activate === CustomerStatus.INACTIVE) {

                const token = await GenerateToken(customer.id, customer.email)

                return {
                    message: "Activate Your Account Now ",
                    token
                }
            } else {
                const signature: Ireq = { userId: customer.id, email: customer.email, firstname: customer.firstname }

                const payload = await this.jwtService.sign(signature)

                customer.token = payload

                await this.customerRepository.save(customer)

                return {
                    customer
                }
            }

        } catch (error) {

            if (error instanceof ValidationError) {
                throw new HttpException(error, HttpStatus.BAD_REQUEST)
            }
            console.log(error)
            throw new BadRequestException(error.response)
        }
    }

    async ActivateAccount(body) {
        const { token } = body
        const payload: any = await verifyToken(token)
        console.log(payload)

        try {
            const payload: any = await verifyToken(token)
            console.log(payload)
            if (!payload) {
                throw new HttpException(error, HttpStatus.BAD_REQUEST)
            }
            const customer = await this.customerRepository.findOneById(payload.id)
            if (!customer)
                throw new ConflictException('Customer Not Found')
            customer.activate = CustomerStatus.ACTIVE
            await this.customerRepository.save(customer)
            return 'Activated Successfully'
        } catch (error) {
            if (error instanceof jwt.JsonWebTokenError)
                throw new HttpException('Invalid Token kk', HttpStatus.BAD_REQUEST)
            if (error instanceof jwt.TokenExpiredError) {
                throw new HttpException('Token has Expired', HttpStatus.BAD_REQUEST)
            } else {
                throw new HttpException(error, HttpStatus.BAD_REQUEST)
            }
        }
    }

    async Forgotpassword(body) {
        const { email } = body
        try {
            const customer = await this.customerRepository.findOne({
                where: {
                    email: email
                }
            })
            if (!customer) {
                throw new ConflictException('Customer Not Found')
            }
            const token = await GenerateToken(customer.id, customer.email)
            // send email with token
            return token

        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    async ChangePassword(body, payload) {
        const { password } = body
        try {
            const customer = await this.customerRepository.findOne({
                where: {
                    email: payload.email
                }
            })
            if (!customer) {
                throw new UnauthorizedException()
            }

            const unhashOldpasword = comparepassword(password, customer.password)
            if (unhashOldpasword) {
                throw new HttpException('ChangePassword to another password , this has been used before', 400)
            }
            const newHash = hashpassword(password)

            customer.password = newHash

            await this.customerRepository.save(customer)

            return 'Password successfully Updated'
        } catch (error) {
            throw new HttpException(error, 400)
        }
    }
}

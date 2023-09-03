import { Injectable, HttpException, BadRequestException, ConflictException, HttpStatus } from '@nestjs/common';
import { CreateCustomer } from '../customer/dto/create-customer.dto';
import { Ilogin, Ireq } from './dto/auth.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Customer } from '../customer/entities/customer.entity';
import { DeepPartial, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Db_Constants } from '../common/dto/common-dto';
import { hashpassword } from '../common/utils/functions';
import { JwtService } from '@nestjs/jwt';
import { CustomerRepository } from '../customer/customer.repository';
import { GenerateToken, verifyToken } from '../utils/functions';
import * as jwt from 'jsonwebtoken'
import { error } from 'console';

class Decode {
    email: string
}


@Injectable()
export class AuthService {
    constructor(private cloudinaryService: CloudinaryService, private readonly jwtService: JwtService, private readonly customerRepository: CustomerRepository) { }
    async SignUp(body: CreateCustomer) {
        try {
            const customer = new Customer()
            if (body.profilepicture) {
                const image_url = await this.cloudinaryService.uploadImage(body.profilepicture)
                body.profilepicture = image_url.url
            }
            const isActive = await this.customerRepository.findOne({
                where: [
                    { firstname: body.firstname },
                    { email: body.email }
                ]
            })
            if (isActive)
                throw new BadRequestException("Customer Already Exists")
            for (const [key, value] of Object.entries(body)) {
                customer[key] = value
            }
            const hashpass = await hashpassword(body.password)
            
            body.password = hashpass

            const save = await this.customerRepository.save(customer)

            const token = GenerateToken(save.id, save.email)

            return save

        } catch (error) {
            console.log(error)
            throw new HttpException(error.response, 400)
        }
    }
    async Login(body: Ilogin) {
        const { email, password } = body
        try {
            const customer = await this.customerRepository.findOne({
                where: [
                    { email },
                    { password }
                ]
            })
            if (!customer)
                throw new ConflictException("Invalid Customer Credentials")

            const signature: Ireq = { userId: customer.id, email: customer.email, firstname: customer.firstname }

            const payload = await this.jwtService.sign(signature)

            customer.token = payload

            await this.customerRepository.save(customer)

            return customer
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    async ActivateAccount(token: string) {
        try {
            const payload = await verifyToken(token)
            if (payload) {
                throw new HttpException(error, HttpStatus.BAD_REQUEST)
            }
            // const user = await this.customerRepository.findOneById(payload.id)
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                throw new HttpException('Token has Expired', HttpStatus.BAD_REQUEST)
            } else {
                throw new HttpException(error, HttpStatus.BAD_REQUEST)
            }
        }
    }
}

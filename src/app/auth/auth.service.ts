import { Injectable, HttpException, BadRequestException } from '@nestjs/common';
import { CreateCustomer } from '../customer/dto/create-customer.dto';
import { Ilogin } from './dto/auth.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Customer } from '../customer/entities/customer.entity';
import { DeepPartial, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Db_Constants } from '../common/dto/common-dto';
import { hashpassword } from '../common/utils/functions';


@Injectable()
export class AuthService {
    constructor(private cloudinaryService: CloudinaryService, @InjectRepository(Customer) private readonly customerRepository: Repository<Customer>) { }
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
            return save
        } catch (error) {
            console.log(error)
            throw new HttpException(error.response, 400)
        }
    }

    async Login(body: Ilogin) {

    }
}

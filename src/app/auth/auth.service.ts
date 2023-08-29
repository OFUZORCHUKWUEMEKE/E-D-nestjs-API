import { Injectable, HttpException } from '@nestjs/common';
import { CreateCustomer } from '../customer/dto/create-customer.dto';
import { Ilogin } from './dto/auth.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Customer } from '../customer/entities/customer.entity';
import { DeepPartial, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Db_Constants } from '../common/dto/common-dto';

@Injectable()
export class AuthService {
    constructor(private cloudinaryService: CloudinaryService, @InjectRepository(Customer) private readonly customerRepository: Repository<Customer>) { }
    async SignUp(body: DeepPartial<Customer>) {
        try {
            if (body.profilepicture) {
                const image_url = await this.cloudinaryService.uploadImage(body.profilepicture)
                body.profilepicture = image_url.url
            }
            const saved = await this.customerRepository.create(body)
            return saved

        } catch (error) {
            console.log(error)
            throw new HttpException(error.response, 400)
        }
    }

    async Login(body: Ilogin) {

    }


}

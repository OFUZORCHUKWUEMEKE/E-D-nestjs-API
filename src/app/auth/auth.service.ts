import { Injectable } from '@nestjs/common';
import { CreateCustomer } from '../customer/dto/create-customer.dto';
import { Ilogin } from './dto/auth.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Customer } from '../customer/entities/customer.entity';
import { DeepPartial, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Db_Constants } from '../common/dto/common-dto';

@Injectable()
export class AuthService {
    constructor(private cloudinaryService: CloudinaryService) { }
    async SignUp(body: DeepPartial<Customer>) {
        try {
            const customer = new Customer()
            if (body.profilepicture) {
                const image_url = await this.cloudinaryService.uploadImage(body.profilepicture)
                body.profilepicture = image_url.url
            }
            for (const [key, value] of Object.entries(body)) {
                body[key] = value;
            }
            // await th

        } catch (error) {

        }
    }

    async Login(body: Ilogin) {

    }


}

import { Injectable } from '@nestjs/common';
import { CreateCustomer } from '../customer/dto/create-customer.dto';

@Injectable()
export class AuthService {
    async SignUp(body:CreateCustomer){
         
    }
}

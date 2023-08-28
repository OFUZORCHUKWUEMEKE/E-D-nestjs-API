import { Body, Controller, Post } from '@nestjs/common';
// import { CreateCustomer } from './dto/createcustomer.dto';
import { AuthService } from './auth.service';
import { CreateCustomer } from '../customer/dto/create-customer.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post()
    async SignUp(@Body() payload: CreateCustomer) {
        return await this.authService.SignUp(payload)
    }

    @Post()
    async Login() {

    }




}

import { Body, Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
// import { CreateCustomer } from './dto/createcustomer.dto';
import { AuthService } from './auth.service';
import { CreateCustomer } from '../customer/dto/create-customer.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Ilogin } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post()
    @UseInterceptors()
    async SignUp(@Body() payload: CreateCustomer, @UploadedFile() file) {
        return await this.authService.SignUp(payload)
    }

    @Post()
    async Login(@Body() body:Ilogin) {

    }




}

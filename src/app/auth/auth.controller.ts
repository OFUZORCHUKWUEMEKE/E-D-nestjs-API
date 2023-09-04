import { Body, Controller, Post, UploadedFile, UploadedFiles, UseInterceptors, HttpCode, HttpStatus, UseGuards, Req } from '@nestjs/common';
// import { CreateCustomer } from './dto/createcustomer.dto';
import { AuthService } from './auth.service';
import { CreateCustomer } from '../customer/dto/create-customer.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Ilogin } from './dto/auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { Customer } from '../customer/entities/customer.entity';
import { DeepPartial } from 'typeorm'
import { AuthGuard } from './guard/auth.gaurd';
import { Auth, Jwt } from './decorators/jwt.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('/signup')
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(FileInterceptor('file'))
    async SignUp(@Body() payload: CreateCustomer, @UploadedFile() file: Express.Multer.File) {
        if (file) {
            payload.profilepicture = file
        }
        return await this.authService.SignUp(payload)
    }

    @Post('/login')
    @HttpCode(HttpStatus.ACCEPTED)
    async Login(@Body() body) {
        return await this.authService.Login(body)
        // console.log(body)
    }

    @Post('/activate')
    async ActivateAccount(@Body() body) {
        // console.log(typeof token)
        return await this.authService.ActivateAccount(body)
    }

    @Post('/forgot-password')
    async ForgetPassword(@Body() body) {
        return this.authService.Forgotpassword(body.email)
    }

    @Post("/change-password")
    async ChangePassword(@Body() body,@Jwt() payload) {
        return await this.authService.ChangePassword(body,payload)
    }

}

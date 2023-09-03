import { Body, Controller, Post, UploadedFile, UploadedFiles, UseInterceptors, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
// import { CreateCustomer } from './dto/createcustomer.dto';
import { AuthService } from './auth.service';
import { CreateCustomer } from '../customer/dto/create-customer.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Ilogin } from './dto/auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { Customer } from '../customer/entities/customer.entity';
import { DeepPartial } from 'typeorm'
import { AuthGuard } from './guard/auth.gaurd';
import { Auth } from './decorators/jwt.decorator';

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
    async Login(@Body() body: Ilogin) {
        return await this.authService.Login(body)
    }

    @Post('/activate')
    async ActivateAccount(@Body() email) {
        return await this.authService.ActivateAccount(email)
    }

    async ForgetPassword(@Body() email:string){
        return this.authService.Forgotpassword(email)
    }

    @Auth('jwt')
    async ChangePassword(@Body() newpassword:string){
         return await this.authService.ChangePassword(newpassword)
    }

}

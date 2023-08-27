import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {

    @Post()
    async SignUp(@Body() body) {

    }

    @Post()
    async Login() {

    }




}

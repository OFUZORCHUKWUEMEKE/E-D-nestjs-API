import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class Ilogin {

    @ApiProperty({
        description: 'email'
    })
    email: string

    @ApiProperty({
        description: "Password"
    })
    password: string

}

export class Ireq {
    userId: string
    firstname: string
    email: string
}

export interface verify{
    email:string
}
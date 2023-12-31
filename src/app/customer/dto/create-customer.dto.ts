import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsString, IsNotEmpty, IsOptional } from 'class-validator'
import { CustomerType, DailyLimit, SubscriptionType } from 'src/app/common/dto/common-dto'

export class CreateCustomer {
    @ApiProperty({
        description: "Business Name"
    })
    @IsString()
    @IsNotEmpty()
    businessname: string

    @ApiProperty({
        description: 'First Name '
    })
    @IsString()
    @IsNotEmpty()
    firstname: string

    @ApiProperty({
        description: 'First Name '
    })
    @IsString()
    @IsNotEmpty()
    lastname: string

    @IsString()
    @IsNotEmpty()
    password: string

    @ApiProperty({
        description: 'Business Email'
    })
    @IsNotEmpty()
    @IsString()
    email: string

    @ApiPropertyOptional()
    profilepicture: Express.Multer.File

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    customertype: CustomerType
}
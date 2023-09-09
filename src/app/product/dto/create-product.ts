import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateProduct {
    @ApiProperty({
        description: "Name Of Product"
    })
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({
        description: "Description of Product"
    })
    @IsString()
    @IsNotEmpty()
    description: string

    @ApiProperty({
        description: "Number Of Crates available"
    })
    @IsString()
    @IsNotEmpty()
    quantity_per_crate: number
}


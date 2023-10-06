import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, isString } from "class-validator";

export class CreateProduct {
    @ApiProperty({
        description: "Description of Product"
    })
    @IsString()
    @IsNotEmpty()
    description: string

    @ApiProperty({
        description: "Number Of Crates available"
    })
    @IsNumber()
    @IsNotEmpty()
    quantity_per_crate: number


    @ApiProperty({
        description: "Product Type Name"
    })
    @IsString()
    @IsNotEmpty()
    product_type_name: string
}

export class Product_Type {
    @ApiProperty({
        description: "Name of product"
    })
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty({
        description: "Product Price"
    })
    @IsNotEmpty()
    @IsNumber()
    price: number

    @ApiProperty({
        description: "Product Description"
    })
    @IsNotEmpty()
    @IsString()
    description: string

    @IsNotEmpty()
    @IsNumber()
    quantity: number
}


import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsEnum, IsNotEmpty, IsString, MaxLength} from "class-validator";
import {AddressStatus} from "../../enum/AddressStatus";

export class ModifyPayloadDto {
    @IsEnum(AddressStatus)
    @IsNotEmpty()
    @ApiProperty({description: 'Status', enum: AddressStatus, format: 'enum', required: true})
    status: AddressStatus;

    @IsString()
    @MaxLength(100)
    @ApiProperty({description: 'Name', type: String, format: 'title', required: false, maxLength: 100})
    name: string;

    @IsString()
    @IsEmail()
    @MaxLength(500)
    @ApiProperty({description: 'Email address', type: String, format: 'email', required: false, maxLength: 500})
    email: string;
}
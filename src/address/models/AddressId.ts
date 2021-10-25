import {IsNotEmpty, IsString, MaxLength} from "class-validator";

export class AddressId {
    @IsString()
    @MaxLength(32)
    @IsNotEmpty()
    id: string;
}
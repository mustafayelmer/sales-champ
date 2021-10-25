import {IsInt, IsNotEmpty, IsPositive, Max} from "class-validator";

export class PaginateParamDto {
    @IsInt()
    @IsPositive()
    @Max(1000)
    @IsNotEmpty()
    page: number;
}
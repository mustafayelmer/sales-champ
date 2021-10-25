import {HttpStatus} from "@nestjs/common";
import {CoreError} from "./CoreError";

export class WrappedValidationError extends CoreError {
    private static readonly statusMap: Record<string, number> = {
        'isEnum': HttpStatus.FORBIDDEN,
        'isNotEmpty': HttpStatus.UNPROCESSABLE_ENTITY,
        'isString': HttpStatus.UNPROCESSABLE_ENTITY,
        'maxLength': HttpStatus.UNPROCESSABLE_ENTITY,
        'isNumberString': HttpStatus.UNPROCESSABLE_ENTITY,
        'length': HttpStatus.UNPROCESSABLE_ENTITY,
        'isPositive': HttpStatus.UNPROCESSABLE_ENTITY,
        'isEmail': HttpStatus.UNPROCESSABLE_ENTITY,
        'whitelistValidation': HttpStatus.FORBIDDEN,
    };
    constructor(field: string, pipe: string, message: string) {
        const status = WrappedValidationError.statusMap[pipe] ?? HttpStatus.BAD_REQUEST;
        super(`Not validated for ${message} [field: ${field}, pipe: ${pipe}]`, status, {field, pipe});
    }
}
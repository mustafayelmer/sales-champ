import {HttpStatus} from "@nestjs/common";
import {CoreError} from "./CoreError";

export class UnauthorizedError extends CoreError {
    constructor() {
        super(`You must use api-key to use it`, HttpStatus.UNAUTHORIZED);
    }
}
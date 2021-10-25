import {HttpStatus} from "@nestjs/common";
import {CoreError} from "./CoreError";

export class NotFoundError extends CoreError {
    constructor(path: string) {
        super(`Path was not found: ${path}`, HttpStatus.NOT_FOUND, {path});
    }
}
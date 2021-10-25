import {HttpStatus} from "@nestjs/common";
import {CoreError} from "../../error/CoreError";

// noinspection JSUnusedGlobalSymbols
export class InvalidPageError extends CoreError {
    constructor(page: number, type: string) {
        super(`Page is invalid with value: ${page} and type: ${type}`, HttpStatus.BAD_REQUEST, {page, type});
    }
}
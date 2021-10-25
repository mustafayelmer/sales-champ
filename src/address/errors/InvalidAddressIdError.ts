import {HttpStatus} from "@nestjs/common";
import {CoreError} from "../../error/CoreError";

// noinspection JSUnusedGlobalSymbols
export class InvalidAddressIdError extends CoreError {
    constructor(id: string) {
        super(`Address id is invalid with ${id}`, HttpStatus.BAD_REQUEST, {id});
    }
}
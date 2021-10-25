import {HttpStatus} from "@nestjs/common";
import {AddressStatus} from "../../enum/AddressStatus";
import {CoreError} from "../../error/CoreError";

// noinspection JSUnusedGlobalSymbols
export class AddressNotUpdatableError extends CoreError {
    constructor(id: string, status: AddressStatus) {
        super(`Address is not updatable with status ${status} [id: ${id}]`, HttpStatus.FORBIDDEN, {id, status});
    }
}
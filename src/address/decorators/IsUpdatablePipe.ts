import { PipeTransform, Injectable } from '@nestjs/common';
import {Model, Types} from 'mongoose';
import {InvalidAddressIdError} from "../errors/InvalidAddressIdError";
import {InjectModel} from "@nestjs/mongoose";
import {AddressDocument, AddressEntity} from "../AddressSchema";
import {AddressStatus} from "../../enum/AddressStatus";
import {AddressNotUpdatableError} from "../errors/AddressNotUpdatableError";
import {Address} from "../models/Address";

@Injectable()
export class IsUpdatablePipe implements PipeTransform<string, Promise<string>> {
    constructor(
        @InjectModel(AddressEntity.name) private readonly _model: Model<AddressDocument>,
    ) {
    }
    async transform(value: string): Promise<string> {
        const doc = await this._model.findById(value) as Address;
        if (doc && [AddressStatus.NOT_INTERESTED, AddressStatus.INTERESTED].includes(doc.status)) {
            throw new AddressNotUpdatableError(doc.id, doc.status);
        }
        return value;
    }
}
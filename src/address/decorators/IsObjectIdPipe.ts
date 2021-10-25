import { PipeTransform, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import {InvalidAddressIdError} from "../errors/InvalidAddressIdError";

@Injectable()
export class IsObjectIdPipe implements PipeTransform<string, string> {
    transform(value: string): string {
        if (!value || typeof value !== 'string' || !Types.ObjectId.isValid(value)) {
            throw new InvalidAddressIdError(value);
        }
        return value;
    }
}
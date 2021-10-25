import { PipeTransform, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import {InvalidAddressIdError} from "../errors/InvalidAddressIdError";
import {InvalidPageError} from "../errors/InvalidPageError";

@Injectable()
export class IsPagePipe implements PipeTransform<number, number> {
    transform(value: number): number {
        try {
            value = parseInt(value as unknown as string, 10);
        } catch (e) {
            throw new InvalidPageError(value, 'invalid-integer');
        }
        if (value < 1 || value > 1000) {
            throw new InvalidPageError(value, 'invalid-range');
        }
        return value;
    }
}
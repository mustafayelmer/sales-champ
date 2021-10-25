import {InjectModel} from "@nestjs/mongoose";
import {AddressDocument, AddressEntity} from "../AddressSchema";
import {Model} from "mongoose";
import {AddressStatus} from "../../enum/AddressStatus";
import {Injectable} from "@nestjs/common";
import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface
} from "class-validator";

@ValidatorConstraint({async: true})
@Injectable()
export class IsAddressUpdatableConstraint implements ValidatorConstraintInterface {
    constructor(
        @InjectModel(AddressEntity.name) private readonly _model: Model<AddressDocument>,
    ) {
    }

    // noinspection JSUnusedLocalSymbols
    validate(id: any, args: ValidationArguments) {
        return this._model.findById(id).then(doc => {
            return !(!doc && [AddressStatus.NOT_INTERESTED, AddressStatus.INTERESTED].includes(doc.status));
        });
    }
}

export function IsAddressUpdatable(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsAddressUpdatableConstraint,
        });
    };
}
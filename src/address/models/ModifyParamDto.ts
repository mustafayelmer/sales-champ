import {IsAddressUpdatable} from "../decorators/IsAddressUpdatable";
import {AddressId} from "./AddressId";

export class ModifyParamDto extends AddressId {
    @IsAddressUpdatable()
    id: string;
}
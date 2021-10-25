import {AddressStatus} from "../../enum/AddressStatus";
import {CountryEnum} from "../../enum/CountryEnum";

export interface Address {
    _id?: any;
    id?: string;
    country?: CountryEnum;
    city?: string;
    street?: string;
    postalcode?: string;
    number?: number;
    numberAddition?: string;
    createdAt?: string;
    updatedAt?: string;
    status?: AddressStatus;
    name?: string;
    email?: string;
}
import axios, {AxiosResponse} from "axios";
import {Main} from "../src/Main";
import {AddressController} from "../src/address/AddressController";
import {CountryEnum} from "../src/enum/CountryEnum";
import {Address} from "../src/address/models/Address";
import {CreateRequestDto} from "../src/address/models/CreateRequestDto";

// TODO
const port = 7777;
let addressController: AddressController;
const host = `http://localhost:${port}/address`;
beforeAll(async() => {
    await Main.initServer();
    await Main.initOpenApi();
    await Main.run(port)
    addressController = AddressController.INS;
})

const _setKey = (obj: unknown, field: string, value: unknown): void => {
    obj[field] = value
}
describe('Address', () => {
    describe('create', () => {
        const doc = {
            country: null,
            city: null,
            postalcode: null,
            number: null,
            numberAddition: null,
        } as CreateRequestDto;
        test('country should be valid', async () => {
            _setKey(doc, 'country', 1);
            try {
                await axios.post(host, doc);
                fail(`Expected failure response`);
            } catch (e) {
                expect(e?.response?.status ?? 0).toBe(403);

            }
        });
        doc.country = CountryEnum.NL;
        test('city should be valid', async () => {
            try {
                await axios.post(host, doc);
                fail(`Expected failure response`);
            } catch (e) {
                expect(e?.response?.status ?? 0).toBe(403);
            }
        });

    });
});

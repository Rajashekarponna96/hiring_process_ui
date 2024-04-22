import { UserAccout } from "./userAccount";
import { VendorPoc } from "./vendorPoc";

export class Vendor{
    id!: number;
    vendorName!: string;
    location!: string;
    email!: string;
    mobile!: string;
    userAccout?: UserAccout;
}
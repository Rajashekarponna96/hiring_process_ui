import { UserAccout } from "./userAccount";

export class Recruiter {
    id!: number;
    firstName!: string;
    lastName!: string;
    email!: string;
    mobile?: string;
    userAccount?: UserAccout;
}

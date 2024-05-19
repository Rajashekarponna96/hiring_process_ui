import { Candidate } from "./candidate";
import { UserAccout } from "./userAccount";

export class HiringFlowActivity{
    id!: number;
    userAccout!: UserAccout;
    createdDate: any;
    hiringFlowType!: string;
    candidate!: Candidate;
}
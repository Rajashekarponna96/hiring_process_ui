import { Candidate } from './candidate';
import { HiringFlowType } from './hiringFlowType';
import { UserAccout } from './userAccount';


export class HiringFlowActivity {
    id: number | undefined;
    userAccount: UserAccout = new UserAccout();
    createdDate: Date | undefined;
    hiringFlowType: HiringFlowType | undefined;
    candidate: Candidate = new Candidate();
}

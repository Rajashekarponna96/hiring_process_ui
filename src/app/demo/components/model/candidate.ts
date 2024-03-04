
import { Currency } from "./currency";
import { Education } from "./education";
import { Experience } from "./experience";
import { Source } from "./source";
//import { TalentPool } from "./talentpool";

export class Candidate {
    firstName: string | undefined;
    lastName: string | undefined;
    middleName:string | undefined
    email: string | undefined;
    mobile: string | undefined;
    source!: Source;
    hiringFlowType:string | undefined
    currentLocation!: Location;
    preferredLocation!: Location;
    availToJoin:string | undefined
    currecntSalary:string | undefined
    expectedSalary: string | undefined;
    currency!: Currency;
    gender: string | undefined;
    dateOfBirth: Date | undefined;
    skills:string[] | undefined
    experiences!: Experience;
    educations!: Education;
   // talentPool!: TalentPool;

}

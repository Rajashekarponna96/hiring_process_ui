
import { Currency } from "./currency";
import { Education } from "./education";
import { Experience } from "./experience";
import { Job } from "./job";
import { Source } from "./source";
import { TalentPool } from "./talentpool";
import { Location } from "./location";

export class Candidate {
    id: number | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    middleName:string | undefined
    email: string | undefined;
    mobile: string | undefined;
    alterMobile:string | undefined
    source!: Source;
    stage!: string;
    current!: Location; 
    preferred!: Location; 
    avialToJoin!:string 
    currentSalary!:number
    expectedSalary: number | undefined;
    currency!: Currency; 
    gender: string | undefined;
    dateOfBirth: Date | undefined;
    skills:string[] =['']
    experiences!: Experience[];
    educations!: Education[];
    talentPool!: TalentPool;
    job!:Job
    createdBy!: string;
    modifiedBy!: string;


}


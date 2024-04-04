import { Currency } from "../model1/currency"
import { Education } from "../model1/education"
import { Experience } from "../model1/experience"
import { Job } from "../model1/job"
import { TalentPool } from "../model/talentpool"
import { TalentPool } from "../model1/talentpool"
import { Source } from "./source"

export interface Candidate{
    id: number 
    firstName: string 
    lastName: string
    middleName:string 
    email: string 
    mobile: string 
    alterMobile:string 
    source: Source;
    stage: string;
    current: Location; 
    preferred: Location; 
    avialToJoin:string 
    currentSalary:number
    expectedSalary: number 
    currency: Currency; 
    gender: string 
    dateOfBirth: Date 
    skills:string[] =[];
    experiences: Experience[];
    educations: Education[];
    talentPool: TalentPool;
    job:Job
}
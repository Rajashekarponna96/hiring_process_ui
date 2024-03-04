import { Department } from "./Department";
import { Candidate } from "./candidate";
import { Currency } from "./currency";
import { Recruiter } from "./recruiter";
import { Location } from "./location"
import { HiringFlow } from "./HiringFlow";

export class Job {
    id!: number;
    title!: string;
    description!: string;
    department!: Department;
    openings!: number;
    targetHireDate:any;
    currney!: Currency;
    salaryMinimum!: number;
    salaryMaximum!: number;
    type!: string;
    locations!: Location;
    flows!: HiringFlow;
    experience!: number;
    candidates!: Candidate;
    recruiters!: Recruiter;

}
import { Department } from "../model/Department";
import { HiringFlow } from "../model/HiringFlow";
import { Candidate } from "../model/candidate";
import { Client } from "../model/client";
import { Currency } from "../model/currency";
import { Recruiter } from "../model/recruiter";

export interface Job{
    id: number;
    title: string;
    description: string;
    department: Department;
    openings: number;
    targetHireDate:any;
    currney: Currency;
    // salaryMinimum!: number;
    salaryMaximum: number;
    type: string;
    locations: Location;
    flows: HiringFlow;
    experience: number;
    candidates: Candidate;
    recruiters: Recruiter;
    clients: Client;
    expectedNoticePeriod: string;
}
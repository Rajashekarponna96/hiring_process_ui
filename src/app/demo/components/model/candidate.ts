export interface Candidate {
availToJoin: any;
    id: number;
    firstName: string;
    lastName: string;
    middleName: string;
    email: string;
    mobile: string;
    source: Source;
    stage: Stage;
    current: Location;
    avialToJoin: number;
    preferred: Location;
    currentSalary: number;
    expectedSalary: number;
    currency: CurrencyType;
    gender: string;
    dateOfBirth: string;
    talentPool: TalentPool;
    job: Job;
    skills: string[];
}

export interface Source {
    id: number;
    name: string;
    description: string;
}

export interface Stage {
    id: number;
    type: string;
    description: string;
    source: Source;
}

export interface Location {
    id: number;
    name: string;
    code: string;
}

export interface CurrencyType {
    id: number;
    name: string;
    code: string;
    symbol: string;
}

export interface TalentPool {
    id: number;
    name: string;
    description: string;
}

export interface Department {
    id: number;
    name: string;
    code: string;
}

export enum JobType {
    FullTime = "FullTime",
    PartTime = "PartTime",
    Contract = "Contract",
    Freelance = "Freelance",
}

export interface Job {
    id: number;
    title: string;
    description: string;
    department: Department;
    openings: number;
    targetHireDate: string;
    currency: CurrencyType;
    salaryMinimum: number;
    salaryMaximum: number;
    type: JobType;
}

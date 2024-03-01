export interface TalentPool {
    id: number;
    name: string;
    description: string;
    candidates: Candidate[];
}

export interface Candidate {
    id: number;
}

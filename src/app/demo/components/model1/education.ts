import { Candidate } from "../model/candidate"

export interface Education{
    course:string  
    branch:string
    startOfCourse: Date 
    endOfCourse: Date 
    college:string 
    location:string 
    candidate: Candidate
    university: string
}
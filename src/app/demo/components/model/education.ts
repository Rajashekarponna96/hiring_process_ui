import { Candidate } from "./candidate"

export class Education{
    course:string | undefined
    branch:string | undefined
    startOfCourse :Date | undefined
    endOfCourse:Date | undefined
    college:string | undefined
    location:string | undefined
    candidate!: Candidate
    
   
    

}
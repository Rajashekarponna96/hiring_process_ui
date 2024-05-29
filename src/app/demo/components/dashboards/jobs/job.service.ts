import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from '../../model/job';
import { Vendor } from '../../model/vendor';
import { Recruiter } from '../../model/recruiter';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private baseUrl = 'http://localhost:9000/job';

  constructor(private http: HttpClient) { }

  getAllJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.baseUrl}/alljobslist`);
  }

  getAllVendors(): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(`${this.baseUrl}/allvendorslist`);
  }

  getAllRecruiters(): Observable<Recruiter[]> {
    return this.http.get<Recruiter[]>(`${this.baseUrl}/allrecruiterslist`);
  }


  assignVendorToJob(jobId: number, vendorId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${jobId}/vendors`, { vendorId });
  }

  getJobList(page: number, size: number): Observable<any> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<any>(`${this.baseUrl}/joblistwithpagination`, { params });
  }

  searchJobs(code: string, page: number, size: number): Observable<any> {
    let params = new HttpParams().set('code', code).set('page', page.toString()).set('size', size.toString());
    return this.http.get<any>(`${this.baseUrl}/searchpage`, { params });
  }

  deleteJob(jobId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${jobId}`);
  }

  getUnassignedJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.baseUrl}/unassigned-jobs`);
  }
}

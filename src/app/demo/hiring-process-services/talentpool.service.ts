import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TalentPoolOne } from '../components/model/talentpoolone';
import { Pagination } from '../components/model/pagination';
import { Candidate } from '../components/model/candidate';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TalentpoolService {

  private baseUrl = `${environment.hiringprocessurl}/talentPool`;

  constructor(private http: HttpClient) { }

  getTalentPoolList(): Observable<TalentPoolOne[]> {
    return this.http.get<TalentPoolOne[]>(`${this.baseUrl}/all`);
  }

  searchTalentPools(inputValue: string, page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/searchpage`, {
      params: {
        code: inputValue,
        page: page.toString(),
        size: size.toString()
      }
    });
  }

  getTalentPoolListWithPagination(page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/talentpoollistwithpagination`, {
      params: {
        page: page.toString(),
        size: size.toString()
      }
    });
  }

  deleteTalentPool(talentPoolId: number): Observable<TalentPoolOne> {
    return this.http.delete<TalentPoolOne>(`${this.baseUrl}/${talentPoolId}`);
  }
  updateTalentPool(talentPool: TalentPoolOne): Observable<TalentPoolOne> {
    return this.http.put<TalentPoolOne>(`${this.baseUrl}/${talentPool.id}`, talentPool);
  }

  addTalentPool(talentPool: TalentPoolOne): Observable<TalentPoolOne> {
    return this.http.post<TalentPoolOne>(`${this.baseUrl}/`, talentPool);
  }

  getAllCandidates(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(`${this.baseUrl}/all`);
  }

  getInactiveCandidates(page: number, size: number): Observable<any> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<any>(`${this.baseUrl}/inactivecandidatelistwithpagination`, { params });
  }

  searchCandidates(inputValue: string, page: number, size: number): Observable<any> {
    let params = new HttpParams().set('code', inputValue).set('page', page.toString()).set('size', size.toString());
    return this.http.get<any>(`${this.baseUrl}/searchpage`, { params });
  }

  deleteCandidate(candidateId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${candidateId}`);
  }

  updateCandidate(candidateId: number, candidate: Candidate): Observable<Candidate> {
    return this.http.put<Candidate>(`${this.baseUrl}/${candidateId}`, candidate);
  }

  uploadFile(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<any>(`${this.baseUrl}/fileupload`, formData);
  }

  getTalentPoolById(id: number): Observable<TalentPoolOne> {
    return this.http.get<TalentPoolOne>(`${this.baseUrl}/${id}`);
  }

}


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HiringFlowActivity } from '../components/model/hiringFlowActivity';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HiringFlowActivityService {

  private baseUrl = `${environment.hiringprocessurl}/hiringFlowActivities`;

  constructor(private http: HttpClient) { }

  getHiringFlowList(candidateId: number): Observable<HiringFlowActivity[]> {
    return this.http.get<HiringFlowActivity[]>(`${this.baseUrl}/candidate/${candidateId}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserAccout } from '../components/model/userAccount';
@Injectable({
  providedIn: 'root'
})
export class UseraccountService {
  private baseUrl = 'http://localhost:9000/userAccount';

  constructor(private http: HttpClient) { }

  login(userAccount: UserAccout): Observable<UserAccout> {
    return this.http.post<UserAccout>(`${this.baseUrl}/login`, userAccount)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something bad happened; please try again later.');
  }
}

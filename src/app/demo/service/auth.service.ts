import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../components/model/role'; // Assuming the path to the Role model is correct
import { UserAccout } from '../components/model/userAccount';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:9000/userAccount';

  constructor(private http: HttpClient) { }

  login(loginDto: any): Observable<UserAccout> {
    const loginUrl = `${this.baseUrl}/login`;

    return this.http.post<UserAccout>(loginUrl, loginDto);
  }

  getUserRoles(): Observable<Role[]> {
    debugger;
    const rolesUrl = `${this.baseUrl}/roles`;

    return this.http.get<Role[]>(rolesUrl);
  }

  getUserPermissionsByRole(role: string): Observable<Role[]> {
    debugger;
    const permissionsUrl = `${this.baseUrl}/permissions?role=${role}`;
    //
    return this.http.get<Role[]>(permissionsUrl);
  }
}


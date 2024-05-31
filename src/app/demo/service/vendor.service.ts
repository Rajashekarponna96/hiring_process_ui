import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vendor } from '../components/model/vendor';
import { UserAccout } from '../components/model/userAccount';
import { Role } from '../components/model/role';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  private baseUrl = 'http://localhost:9000/vendor';

  constructor(private http: HttpClient) { }

  addVendor(vendor: Vendor): Observable<Vendor> {
    let email = vendor.email;
    let mobile = vendor.mobile;
    const userAccount: UserAccout = {
      userName: email,
      password: mobile,
      role: { name: 'Admin', description: 'This is for Admin' } as Role,
      id: 0,
      active: false
    };
    vendor.userAccout = userAccount;

    return this.http.post<Vendor>(`${this.baseUrl}/`, vendor);
  }

  updateVendor(vendor: Vendor): Observable<Vendor> {
    let email = vendor.email;
    let mobile = vendor.mobile;
    const userAccount: UserAccout = {
      userName: email,
      password: mobile,
      role: { name: 'Admin', description: 'This is for Admin' } as Role,
      id: 0,
      active: false
    };
    vendor.userAccout = userAccount;

    return this.http.put<Vendor>(`${this.baseUrl}/${vendor.id}`, vendor);
  }

  deleteVendor(vendorId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${vendorId}`);
  }

  getVendorListWithPagination(page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/vendorlistwithpagination`, {
      params: {
        page: page.toString(),
        size: size.toString()
      }
    });
  }
  searchVendorByCode(code: string, page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/searchpage`, {
      params: {
        code: code,
        page: page.toString(),
        size: size.toString()
      }
    });
  }
}

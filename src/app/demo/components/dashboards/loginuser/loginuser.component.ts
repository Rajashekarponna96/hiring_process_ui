import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { UserAccout } from '../../model/userAccount';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginuser',
  templateUrl: './loginuser.component.html',
  styleUrls: ['./loginuser.component.css']
})
export class LoginuserComponent implements OnInit {

  userAccount = new UserAccout();
  userAccounts:UserAccout[] | undefined
  userName: any;
  password: any;


  constructor(private layoutService: LayoutService,private http: HttpClient, private changeDetectorRefs: ChangeDetectorRef,private router: Router) { }

  ngOnInit() {
    this.getAllUserAccountList();
  }

  rememberMe: boolean = false;

  get dark(): boolean {
    return this.layoutService.config.colorScheme !== 'light';
  }

  getUserAccountList() {
    return this.http.get<UserAccout[]>('http://localhost:9000/userAccount/all');

  }
  getAllUserAccountList() {
    return this.getUserAccountList().
      subscribe((data) => {
        console.log(data);
        this.userAccounts = data;
        this.changeDetectorRefs.markForCheck();
      });
  }

  addLogin() {
    this.http.post<UserAccout>('http://localhost:9000/userAccount/login', this.userAccount).subscribe(
      res => {
        console.log(res);
        this.getAllUserAccountList();
        this.router.navigate(['/home']);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured."); 
          this.router.navigate(['/loginuser']);
        }

      });
    console.log(JSON.stringify(this.userAccount));
    this.getAllUserAccountList();

  }
  }

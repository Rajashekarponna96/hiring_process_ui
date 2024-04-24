import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { UserAccout } from '../../model/userAccount';
import { Router } from '@angular/router';
//import { MessageService } from 'primeng/api/public_api';
import { ConfirmationService, MessageService } from 'primeng/api';
import { dE } from '@fullcalendar/core/internal-common';

@Component({
  selector: 'app-loginuser',
  templateUrl: './loginuser.component.html',
  styleUrls: ['./loginuser.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class LoginuserComponent implements OnInit {

  userAccount = new UserAccout();
  userAccounts:UserAccout[] | undefined
  userName: any;
  password: any;


  constructor(private layoutService: LayoutService,private http: HttpClient, private changeDetectorRefs: ChangeDetectorRef,private router: Router,private messageService: MessageService) { }

  ngOnInit() {

  }

  rememberMe: boolean = false;

  get dark(): boolean {
    return this.layoutService.config.colorScheme !== 'light';
  }



  addLogin() {;
    this.http.post<UserAccout>('http://localhost:9000/userAccount/login', this.userAccount).subscribe(
      res => {
        console.log(res);

        this.userAccount = res;
        localStorage.setItem('userDetails', JSON.stringify(this.userAccount));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'userLogin sucessfully', life: 3000 });
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


  }
  }

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { UserAccout } from '../../model/userAccount';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UseraccountService } from 'src/app/demo/service/useraccount.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-loginuser',
  templateUrl: './loginuser.component.html',
  styleUrls: ['./loginuser.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class LoginuserComponent implements OnInit {

  userAccount = new UserAccout();
  userAccounts: UserAccout[] | undefined;
  userName: any;
  password: any;
  rememberMe: boolean = false;

  constructor(
    private layoutService: LayoutService,
    private userAccountService: UseraccountService,
    private changeDetectorRefs: ChangeDetectorRef,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit() { }

  get dark(): boolean {
    return this.layoutService.config.colorScheme !== 'light';
  }

  addLogin() {
    this.userAccountService.login(this.userAccount).subscribe(
      res => {
        console.log(res);
        this.userAccount = res;
        localStorage.setItem('userDetails', JSON.stringify(this.userAccount));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User logged in successfully', life: 3000 });
        this.router.navigate(['/home']);
      },
      (err: HttpErrorResponse) => {
        console.error('Error occurred:', err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Login failed', life: 3000 });
        this.router.navigate(['/loginuser']);
      }
    );
  }
}

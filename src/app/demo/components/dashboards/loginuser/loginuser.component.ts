import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  //selector: 'app-loginuser',
  templateUrl: './loginuser.component.html',
  //styleUrls: ['./loginuser.component.css']
})
export class LoginuserComponent implements OnInit {


  constructor(private layoutService: LayoutService) { }

  ngOnInit() {
  }

  rememberMe: boolean = false;

  get dark(): boolean {
    return this.layoutService.config.colorScheme !== 'light';
  }

}
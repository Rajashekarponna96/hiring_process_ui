import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  //selector: 'app-home',
  templateUrl: './home.component.html',
  //styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
      throw new Error('Method not implemented.');
  }

}
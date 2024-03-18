import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { UserAccout } from '../demo/components/model/userAccount';

@Component({
    selector: 'app-profilemenu',
    templateUrl: './app.profilesidebar.component.html'
})
export class AppProfileSidebarComponent {

    constructor(public layoutService: LayoutService) {
        this.userdeatils = JSON.parse(localStorage.getItem('userDetails') || '{}')
        console.log("username is :"+this.userdeatils.userName)
     }
    userdeatils!: UserAccout;

    get visible(): boolean {
        return this.layoutService.state.profileSidebarVisible;
    }

    set visible(_val: boolean) {
        this.layoutService.state.profileSidebarVisible = _val;
    }

    ngOnInit() {
       
      }

}
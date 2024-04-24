import { Component, OnInit } from '@angular/core';
import { AuthService } from '../demo/service/auth.service';
import { MenuItem } from 'primeng/api';
import { Role } from '../demo/components/model/role'; // Import the Role model
import { Permission } from '../demo/components/model/permission';
import { UserAccout } from '../demo/components/model/userAccount';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {
    model: MenuItem[] = [];
    permissions!: Permission;

    constructor(private authService: AuthService) { }

    permisionslist() {
        this.permissions = JSON.parse(localStorage.getItem('userDetails') || '{}');
        console.log('permission list' + JSON.stringify(this.permissions));
    }

    // isPermissionsEnable(menuItem: MenuItem) { debugger;
    //     debugger;
    //     if(menuItem!=undefined && menuItem?.items!=undefined){
    //       var permission =  menuItem?.items[0]?.label
    //       const user: UserAccout = JSON.parse(localStorage.getItem('userDetails') || '{}');
    //     console.log("permission array size is" + user.role?.permissions);
    //     console.log("permission name is" + menuItem);
    //      let permissions: Permission[] = user.role?.permissions || [];
    //     for (let i = 0; i <= permissions.length; i++) {

    //         //const featureArray: Features[] = JSON.parse(JSON.stringify(this.feature));

    //         if (menuItem.items[0].label ===permissions[i].name) {

    //             console.log("permission name list are " + permissions[i].name);

    //             return true;
    //         }
    //     }

    //     }


    //     //console.log("featutre is not found");
    //     return false;


    // }

    isPermissionsEnable(menuItem: MenuItem) {
        debugger;
        var found=false;
        if(menuItem!=undefined && menuItem?.items!=undefined){
          var permission =  menuItem?.items[0]?.label
          const user: UserAccout = JSON.parse(localStorage.getItem('userDetails') || '{}');
         let permissions: Permission[] = user.role?.permissions || [];

        for (let i = 0; i <= permissions.length; i++) {
            if (permission ===permissions[i].name) {
                console.log("permission name list are " + permissions[i].name);
                found=true;
		break;
            }
        }

        }
        return found;


    }



    ngOnInit() {

        this.model = [
            //home

            {
                icon: 'pi pi-home',
                items: [
                    {
                        label: 'Home',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/home']
                    }
                ]
            },

            {
                icon: 'pi pi-th-large',
                items: [
                    {
                        label: 'Job',
                        icon: 'pi pi-briefcase',
                        items: [
                            {
                                label: 'Jobs',
                                icon: 'pi pi-briefcase',
                                routerLink: ['/jobs']
                            },
                            {
                                label: 'Recruiter',
                                icon: 'pi pi-user',
                                routerLink: ['/recruiter']
                            },
                            {
                                label: 'TalentPool',
                                icon: 'pi pi-check',
                                routerLink: ['/listtalentpool']
                            }
                        ]
                    },
                ]
            },
            //candidate
            {
                icon: 'pi pi-home',
                items: [
                    {
                        label: 'Candidate',
                        icon: 'pi pi-fw pi-user-plus',
                        routerLink: ['/candidate']
                    },

                ]
            },
            {
                icon: 'pi pi-home',
                items: [
                    {
                        label: 'Client',
                        icon: 'pi pi-fw pi-users',
                        routerLink: ['/client']
                    },

                ]
            },
            {
                icon: 'pi pi-vendor',
                items: [
                    {
                        label: 'Vendor',
                        icon: 'pi pi-fw pi-users',
                        routerLink: ['/vendor-list']
                    },

                ]
            },




            //settings
            {
                icon: 'pi pi-home',
                items: [
                    {
                        label: 'Settings',
                        icon: 'pi pi-cog',
                        routerLink: ['/settings']
                    }

                ]
            },

        ];
    }
}
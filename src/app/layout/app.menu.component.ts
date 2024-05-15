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
    permissionList: Permission[] = []

    constructor(private authService: AuthService) { }

    permisionslist() {

        // this.permissions = JSON.parse(localStorage.getItem('userDetails') || '{}');
        const user: UserAccout = JSON.parse(localStorage.getItem('userDetails') || '{}');
        this.permissionList = user.role?.permissions || [];
        console.log('permission list' + this.permissionList);
    }




    isPermissionsEnable(sidemenuname: string) {



        var found = false;
        //  var menuItem=this.model[];

        for (var menuItem of this.permissionList) {
            console.log('menauItemlist :' + menuItem.name)
            console.log('sidemeanu :' + sidemenuname)
            console.log('condition :' + menuItem.name == sidemenuname)
            if (menuItem.name.toLowerCase() == sidemenuname.toLowerCase()) {
                found = true;

            }
        }


        return found;

    }


    //
    ngOnInit() {
        this.permisionslist();
        this.model = [
            //home

            {
                permissionName: 'home',
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
                permissionName: 'job',
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
                permissionName: 'candidate',
                icon: 'pi pi-home',
                items: [
                    {
                        label: 'Candidate',
                        icon: 'pi pi-fw pi-user-plus',
                        routerLink: ['/candidate']
                    },
                    {
                        label: 'hiringflowactivity',
                        icon: 'pi pi-fw pi-user-plus',
                        routerLink: ['/hiringflowactivity']
                    },



                ]
            },
            {
                permissionName: 'client',
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
                permissionName: 'vendor',
                icon: 'pi pi-vendor',
                items: [
                    {
                        label: 'Vendor',
                        icon: 'pi pi-fw pi-users',
                        routerLink: ['/vendor-list']
                    },

                ]
            },
            {
                permissionName: 'email',
                icon: 'pi pi-mail',
                items: [
                    {
                        label: 'Email-Template',
                        icon: 'pi pi-fw pi-users',
                        routerLink: ['/email']
                    },

                ]
            },




            //settings
            {
                permissionName: 'settings',
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
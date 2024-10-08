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
          //  console.log('menauItemlist :' + menuItem.name)
            //console.log('sidemeanu :' + sidemenuname)
            //console.log('condition :' + menuItem.name == sidemenuname)
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
            // {
            //     permissionName: 'resumeuploder',
            //     icon: 'pi pi-upload',
            //     items: [
            //         {
            //             label: 'resumeuploder',
            //             icon: 'pi pi-upload',
            //             routerLink: ['/resumeuploader']
            //         }
            //     ]
            // },
            {
                permissionName: 'resumeviewer',
                icon: 'pi pi-upload',
                items: [
                    {
                        label: 'resumeviewer',
                        icon: 'pi pi-upload',
                        routerLink: ['/resumeviewer']
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
                            // {
                            //     label: 'Recruiter',
                            //     icon: 'pi pi-user',
                            //     routerLink: ['/recruiter']
                            // },
                            // {
                            //     label: 'Pool',
                            //     icon: 'pi pi-check',
                            //     routerLink: ['/listtalentpool']
                            // },
                            {
                                label: 'Assign Jobs To Vendor',
                                icon: 'pi pi-check',
                                routerLink: ['/assignjobstovendor']
                            },
                            {
                                label: 'Assign Jobs To Recruiter',
                                icon: 'pi pi-check',
                                routerLink: ['/assignjobstorecruiter']
                            },
                            // {
                            //     label: 'TalentPool',
                            //     icon: 'pi pi-check',
                            //     routerLink: ['/talentpoolinactivecandidatelist']
                            // }
                        ]
                    },
                ]
            },
            {
                permissionName: 'recruiter',
                icon: 'pi pi-home',
                items: [
                    {
                        label: 'Reruiter',
                        icon: 'pi pi-fw pi-user-plus',
                        routerLink: ['/recruiter']
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
                    // {
                    //     label: 'hiringflowactivity',
                    //     icon: 'pi pi-fw pi-user-plus',
                    //     routerLink: ['/hiringflowactivity']
                    // },



                ]
            },
            {
                permissionName: 'talentpool',
                icon: 'pi pi-home',
                items: [
                    {
                        label: 'TalentPool',
                        icon: 'pi pi-fw pi-user-plus',
                        routerLink: ['/talentpoolinactivecandidatelist']
                    },
                    
                ]
            },
            {
                permissionName: 'pool',
                icon: 'pi pi-home',
                items: [
                    {
                        label: 'Pool',
                        icon: 'pi pi-fw pi-user-plus',
                        routerLink: ['/listtalentpool']
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
                        icon: 'pi pi-envelope',
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
            // {
            //     permissionName: 'uploadfile',
            //     icon: 'pi pi-home',
            //     items: [
            //         {
            //             label: 'Upload-File',
            //             icon: 'pi pi-upload',
            //             routerLink: ['/uploadfile']
            //         }

            //     ]
            // },
            {
                permissionName: 'candidateList',
                icon: 'pi pi-home',
                items: [
                    {
                        label: 'Candidates',
                        icon: 'pi pi-fw pi-users',
                        routerLink: ['/candidateliststageswise']
                    }

                ]
            },

        ];
    }
}
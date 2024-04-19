import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

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
            //pre-boarding
            // {
            //     label: 'Pre-Boarding',
            //     icon: 'pi pi-home',
            //     items: [
            //         {
            //             label: 'pre-boarding',
            //             icon: 'pi pi-fw pi-home',
            //             routerLink: ['/pre-boarding']
            //         }

            //     ]
            // },

            //reports
            // {
            //     label: 'Reports',
            //     icon: 'pi pi-home',
            //     items: [
            //         {
            //             label: 'Reports',
            //             icon: 'pi pi-fw pi-home',
            //             routerLink: ['/reports']
            //         }

            //     ]
            // },


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

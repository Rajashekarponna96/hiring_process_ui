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
                label: 'Home',
                icon: 'pi pi-home',
                items: [
                    {
                        label: 'Home',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/home']
                    }
                ]
            },
            //candidate
            {
                label: 'Candidate',
                icon: 'pi pi-home',
                items: [
                    {
                        label: 'Candidate',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/candidate']
                    },

                    // {
                    //     label: 'Add Candidate',
                    //     icon: 'pi pi-fw pi-home',
                    //     routerLink: ['/menus']
                    // }
                ]
            },

            //recruiter
            {
                label: 'recruiter',
                icon: 'pi pi-home',
                items: [
                    {
                        label: 'recruiter',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/recruiter']
                    }

                ]
            },

            //jobs
            {
                label: 'Jobs',
                icon: 'pi pi-home',
                items: [
                    {
                        label: 'Jobs',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/jobs']
                    }

                ]
            },
            //pre-boarding
            {
                label: 'Pre-Boarding',
                icon: 'pi pi-home',
                items: [
                    {
                        label: 'pre-boarding',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/pre-boarding']
                    }

                ]
            },

            //reports
            {
                label: 'Reports',
                icon: 'pi pi-home',
                items: [
                    {
                        label: 'Reports',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/reports']
                    }

                ]
            },

            {
                label: 'Talent Pool',
                icon: 'pi pi-home',
                items: [
                    {
                        label: 'TalentPool',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/listtalentpool']
                    }
                    // ,
                    // {
                    //     label: 'Compose',
                    //     icon: 'pi pi-fw pi-pencil',
                    //     routerLink: ['/talentpool']
                    // }

                ],

            },

            //settings
            {
                label: 'Settings',
                icon: 'pi pi-home',
                items: [
                    {
                        label: 'Settings',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/settings']
                    }

                ]
            },

        ];
    }
}

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
          
            {
                label: 'Pages',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                              {
                        label: 'Auth',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Login',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: 'Error',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/auth/error']
                            },
                            {
                                label: 'Access Denied',
                                icon: 'pi pi-fw pi-lock',
                                routerLink: ['/auth/access']
                            },
                            {
                                label: 'Register',
                                icon: 'pi pi-fw pi-user-plus',
                                routerLink: ['/auth/register']
                            },
                            {
                                label: 'Forgot Password',
                                icon: 'pi pi-fw pi-question',
                                routerLink: ['/auth/forgotpassword']
                            },
                            {
                                label: 'New Password',
                                icon: 'pi pi-fw pi-cog',
                                routerLink: ['/auth/newpassword']
                            },
                            {
                                label: 'Verification',
                                icon: 'pi pi-fw pi-envelope',
                                routerLink: ['/auth/verification']
                            },
                            {
                                label: 'Lock Screen',
                                icon: 'pi pi-fw pi-eye-slash',
                                routerLink: ['/auth/lockscreen']
                            }
                        ]
                    },
                    {
                        label: 'Crud',
                        icon: 'pi pi-fw pi-pencil',
                        routerLink: ['/pages/crud']
                    },
                    
                ]
            },
                     {
                label: 'User Management',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'List',
                        icon: 'pi pi-fw pi-list',
                        routerLink: ['profile/list']
                    },
                    {
                        label: 'Create',
                        icon: 'pi pi-fw pi-plus',
                        routerLink: ['profile/create']
                    }
                ]
            },
            {
                label: 'Login',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'login',
                        icon: 'pi pi-fw pi-list',
                        routerLink: ['/loginone']
                    },
                    {
                        label: 'Create',
                        icon: 'pi pi-fw pi-plus',
                        routerLink: ['profile/create']
                    }
                ]
            },
            //home


            {
                label: 'Home',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'Home',
                        icon: 'pi pi-fw pi-list',
                        routerLink: ['/home']
                    },

                ]
            },
            //jobs
            {
                label: 'Jobs',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'Jobs',
                        icon: 'pi pi-fw pi-list',
                        routerLink: ['/jobs']
                    },

                ]
            },
            //candidates
            {
                label: 'Candidates',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'Candidates',
                        icon: 'pi pi-fw pi-list',
                        routerLink: ['/candidates']
                    },

                ]
            },
            //pre-loading
            {
                label: 'Pre-loading',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'Pre-loading',
                        icon: 'pi pi-fw pi-list',
                        routerLink: ['/home']
                    },

                ]
            },
            //reports
            {
                label: 'Reports',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'Reports',
                        icon: 'pi pi-fw pi-list',
                        routerLink: ['/home']
                    },

                ]
            },
            //settings
            {
                label: 'Settings',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'Settings',
                        icon: 'pi pi-fw pi-list',
                        routerLink: ['/loginone']
                    },

                ]
            },

            // // {
            // //     label: 'Hierarchy',
            // //     icon: 'pi pi-fw pi-align-left',
            // //     items: [
            // //         {
            // //             label: 'Submenu 1',
            // //             icon: 'pi pi-fw pi-align-left',
            // //             items: [
            // //                 {
            // //                     label: 'Submenu 1.1',
            // //                     icon: 'pi pi-fw pi-align-left',
            // //                     items: [
            // //                         {
            // //                             label: 'Submenu 1.1.1',
            // //                             icon: 'pi pi-fw pi-align-left',
            // //                         },
            // //                         {
            // //                             label: 'Submenu 1.1.2',
            // //                             icon: 'pi pi-fw pi-align-left',
            // //                         },
            // //                         {
            // //                             label: 'Submenu 1.1.3',
            // //                             icon: 'pi pi-fw pi-align-left',
            // //                         }
            // //                     ]
            // //                 },
            // //                 {
            // //                     label: 'Submenu 1.2',
            // //                     icon: 'pi pi-fw pi-align-left',
            // //                     items: [
            // //                         {
            // //                             label: 'Submenu 1.2.1',
            // //                             icon: 'pi pi-fw pi-align-left',
            // //                         }
            // //                     ]
            // //                 }
            // //             ]
            // //         },
            // //         {
            // //             label: 'Submenu 2',
            // //             icon: 'pi pi-fw pi-align-left',
            // //             items: [
            // //                 {
            // //                     label: 'Submenu 2.1',
            // //                     icon: 'pi pi-fw pi-align-left',
            // //                     items: [
            // //                         {
            // //                             label: 'Submenu 2.1.1',
            // //                             icon: 'pi pi-fw pi-align-left',
            // //                         },
            // //                         {
            // //                             label: 'Submenu 2.1.2',
            // //                             icon: 'pi pi-fw pi-align-left',
            // //                         }
            // //                     ]
            // //                 },
            // //                 {
            // //                     label: 'Submenu 2.2',
            // //                     icon: 'pi pi-fw pi-align-left',
            // //                     items: [
            // //                         {
            // //                             label: 'Submenu 2.2.1',
            // //                             icon: 'pi pi-fw pi-align-left',
            // //                         }
            // //                     ]
            // //                 }
            // //             ]
            // //         }
            // //     ]
            // // },
            // {
            //     label: 'Start',
            //     icon: 'pi pi-fw pi-download',
            //     items: [
            //         {
            //             label: 'Buy Now',
            //             icon: 'pi pi-fw pi-shopping-cart',
            //             url: ['https://www.primefaces.org/store']
            //         },
            //         {
            //             label: 'Documentation',
            //             icon: 'pi pi-fw pi-info-circle',
            //             routerLink: ['/documentation']
            //         }
            //     ]
            // }
        ];
    }
}

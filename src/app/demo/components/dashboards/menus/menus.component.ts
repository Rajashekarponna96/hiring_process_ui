import { Component, OnInit } from '@angular/core';
import { MegaMenuItem, MenuItem } from 'primeng/api';

@Component({
    templateUrl: './menus.component.html',
    styles: [
        `
            :host ::ng-deep .p-menubar-root-list {
                flex-wrap: wrap;
            }
        `,
    ],
})
export class MenusComponent implements OnInit {
    breadcrumbItems: MenuItem[] = [];

    tieredItems: MenuItem[] = [];

    items: MenuItem[] = [];

    routeItems: MenuItem[] = [];

    megaMenuItems: MegaMenuItem[] = [];

    panelMenuItems: MenuItem[] = [];

    stepsItems: MenuItem[] = [];

    slideItems: MenuItem[] = [];

    menuItems: MenuItem[] = [];

    plainMenuItems: MenuItem[] = [];

    pageIndex: number = 0;

    ngOnInit() {
        this.routeItems = [
            { label: 'Candidate', routerLink: 'createrecandidate' },
            { label: 'Profile', routerLink: 'candidateprofile' },
            {
                label: 'Experiencne',
                routerLink: 'candidateexperiencne',
            },
            { label: 'Eeducation', routerLink: 'candidateeducation' }
        ];
    }
}

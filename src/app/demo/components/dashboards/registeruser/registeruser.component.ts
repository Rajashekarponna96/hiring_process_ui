import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
	selector: 'app-registeruser',
	templateUrl: './registeruser.component.html',
	styleUrls: ['./registeruser.component.css']
})
export class RegisteruserComponent {

	confirmed: boolean = false;

	constructor(private layoutService: LayoutService) { }

	get dark(): boolean {
		return this.layoutService.config.colorScheme !== 'light';
	}

}
import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  //selector: 'app-loginone',
  templateUrl: './loginone.component.html',
  //styleUrls: ['./loginone.component.scss']
})
export class LoginoneComponent {

	rememberMe: boolean = false;

	constructor(private layoutService: LayoutService) {}

	get dark(): boolean {
		return this.layoutService.config.colorScheme !== 'light';
	}

}

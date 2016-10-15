// Login
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Sway, HasAPI } from './sway';

@Component({
	selector: 'login',
	templateUrl: './views/login.html',
})
export class LoginCmp extends HasAPI {
	constructor(title: Title, public api: Sway) {
		super(api);
		title.setTitle('Login');
	}

	Login(evt: Event) {

	}
}

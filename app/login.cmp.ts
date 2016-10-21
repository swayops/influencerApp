// Login
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Sway, HasAPI } from './sway';

@Component({
	selector: 'login',
	templateUrl: './views/login.html',
})
export class LoginCmp extends HasAPI {
	public loading = false;
	public data: any = {};
	constructor(title: Title, public api: Sway) {
		super(api);
		title.setTitle('Login');
		this.api.Logout(false);
	}

	Login() {
		this.loading = true;
		this.api.Login(this.data, err => {
			this.loading = false;
			this.AddNotification('error', err.msg);
		});
	}
}

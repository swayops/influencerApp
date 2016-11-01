// Login
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Sway, HasAPI } from './sway';

@Component({
	selector: 'login',
	templateUrl: './views/login.html',
})
export class LoginCmp extends HasAPI {
	public loading = false;
	public data: any = {};
	constructor(title: Title, public api: Sway, route: ActivatedRoute) {
		super(api);
		const id = route.snapshot.params['id'];
		if (id) {
			this.api.ForceUser(id, err => {
				this.AddNotification('error', 'You have been very naughty, no Christmas presents for you!');
				this.api.GoTo('login');
			});
			return;
		}
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

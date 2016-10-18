// Signup
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Sway, HasAPI } from './sway';

@Component({
	selector: 'signup',
	templateUrl: './views/signup.html',
})
export class SignupCmp extends HasAPI {
	public loading = false;
	public data: any = {
		influencer: {
			inviteCode: null,
		},
	};
	constructor(title: Title, public api: Sway, route: ActivatedRoute) {
		super(api);
		title.setTitle('Sign Up');
		this.data.influencer.inviteCode = route.snapshot.params['inviteCode'];
	}

	SignUp() {
		this.loading = true;
		this.data.pass2 = this.data.pass;
		this.api.SignUp(this.data, err => {
			this.loading = false;
			this.AddNotification('error', err.msg);
		});
	}
}

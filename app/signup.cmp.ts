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
	public data: any = {};
	constructor(title: Title, public api: Sway, route: ActivatedRoute) {
		super(api);
		title.setTitle('Sign Up');
		const inviteCode = route.snapshot.params['inviteCode'];
		if (inviteCode) this.data.inviteCode = inviteCode;
	}

	Signup(evt: Event) {
		console.log(evt);
	}
}

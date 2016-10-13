// Signup
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Sway, HasAPI } from './sway';

@Component({
	selector: 'signup',
	templateUrl: './views/signup.html',
})
export class SignupCmp extends HasAPI {
	constructor(title: Title, public api: Sway) {
		super(api);
		title.setTitle('Sign Up');
	}
}

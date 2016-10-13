// EditProfile
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Sway, HasAPI } from './sway';

@Component({
	selector: 'editProfile',
	templateUrl: './views/editProfile.html',
})
export class EditProfileCmp extends HasAPI {
	constructor(title: Title, public api: Sway) {
		super(api);
		title.setTitle('Edit Profile');
	}
}

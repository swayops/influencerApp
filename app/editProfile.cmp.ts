// EditProfile
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Sway, HasAPI } from './sway';

@Component({
	selector: 'editProfile',
	templateUrl: './views/editProfile.html',
})
export class EditProfileCmp extends HasAPI {
	public data: any;
	constructor(title: Title, public api: Sway) {
		super(api);
		title.setTitle('Edit Profile');
		const u = this.user,
			inf = u.inf || {};
		this.data = {
			name: u.name,
			email: u.email,
			gender: inf.male ? 'm' : inf.female ? 'f' : '',
			dealPing: inf.dealPing,
			instagram: inf.instagram && inf.instagram.userName,
			youtube: inf.youtube && inf.youtube.userName,
			twitter: inf.twitter && inf.twitter.id,
			facebook: inf.facebook && inf.facebook.id,
		};
	}
}

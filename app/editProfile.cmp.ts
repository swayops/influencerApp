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
	public loading = false;

	constructor(title: Title, public api: Sway) {
		super(api);
		title.setTitle('Edit Profile');
		const u = this.user,
			inf = u.inf || {};
		inf.address = inf.address || {};
		this.data = {
			name: u.name,
			data: u.imageUrl,
			email: u.email,
			influencer: {
				gender: inf.male ? 'm' : inf.female ? 'f' : '',
				dealPing: inf.dealPing,
				instagram: inf.instagram && inf.instagram.userName,
				youtube: inf.youtube && inf.youtube.userName,
				twitter: inf.twitter && inf.twitter.id,
				facebook: inf.facebook && inf.facebook.id,
				categories: [],
				address: {
					address_line1: inf.address.address_line1,
					address_line2: inf.address.address_line2,
					address_city: inf.address.address_city,
					address_state: inf.address.address_state,
					address_zip: inf.address.address_zip,
					address_country: inf.address.address_country,
				},
			},
		};
		this.api.Get('ip', data => this.data.influencer.ip = data.ip);
	}

	Save() {
		this.loading = true;
		this.api.Put('influencer/' + this.user.id, this.data, resp => {
			this.api.ReloadUser();
			this.api.GoHome();
			this.AddNotification('success', 'Successfully updated your profile!');
		}, err => {
			this.loading = false;
			this.AddNotification('error', err.msg);
		});
	}
}

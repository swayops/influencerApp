// Connect
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Sway, HasAPI } from './sway';

@Component({
	selector: 'connect',
	templateUrl: './views/connect.html',
})
export class ConnectCmp extends HasAPI {
	public data: any;
	public loading = false;
	constructor(title: Title, public api: Sway) {
		super(api);
		title.setTitle('Connect Your Social Accounts');
		const inf = this.user.inf || {};
		this.data = {
			instagram: inf.instagram && inf.instagram.userName,
			youtube: inf.youtube && inf.youtube.userName,
			twitter: inf.twitter && inf.twitter.id,
			facebook: inf.facebook && inf.facebook.id,
		};
	}

	LinkAccounts() {
		this.loading = true;
		for (let [k, v] of Object.entries(this.data)) {
			if (!!v) {
				this.api.Get('setPlatform/' + this.user.id + '/' + k + '/' + v,
					data => { /* */ },
					err => this.AddNotification('error', err.msg)
				);
			}
		}
		this.api.GoTo('/dealFeed');
	}
}

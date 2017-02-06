// Connect
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { HasAPI, Sway } from './sway';

import { CleanNetworkUsername } from './utils';

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
			instagram: inf.instagram ? inf.instagram.userName : '',
			youtube: inf.youtube ? inf.youtube.userName : '',
			twitter: inf.twitter ? inf.twitter.id : '',
			facebook: inf.facebook ? inf.facebook.id : '',
		};
	}

	LinkAccounts() {
		this.loading = true;
		this.api.Put('influencer/' + this.user.id, this.data, (resp) => {
			this.api.ReloadUser();
			this.api.GoTo('/dealFeed');
			this.AddNotification('success', 'Successfully linked your social accounts!');
		}, (err) => {
			this.loading = false;
			this.AddNotification('error', err.msg);
		});
	}

	get hasAccounts(): boolean {
		return Object.keys(this.data).some((k) => !!this.data[k]);
	}

	cleanUsername(network: string, name: string) {
		this.data[network] = CleanNetworkUsername(name);
	}
}

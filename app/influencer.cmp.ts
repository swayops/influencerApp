// Influencer
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Sway, HasAPI } from './sway';

@Component({
	selector: 'influencer',
	templateUrl: './views/influencer.html',
})
export class InfluencerCmp extends HasAPI {
	public bio: any = {};
	constructor(title: Title, public api: Sway) {
		super(api);
		title.setTitle('Influencer');
		this.api.Get('bio/' + this.user.id, resp => this.bio = resp || {});
	}
}

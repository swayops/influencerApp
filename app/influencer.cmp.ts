// Influencer
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Sway, HasAPI } from './sway';

@Component({
	selector: 'influencer',
	templateUrl: './views/influencer.html',
})
export class InfluencerCmp extends HasAPI {
	constructor(title: Title, public api: Sway) {
		super(api);
		title.setTitle('Influencer');
	}
}

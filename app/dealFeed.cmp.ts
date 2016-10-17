// DealFeed
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Sway, HasAPI } from './sway';

@Component({
	selector: 'endorsement',
	templateUrl: './views/dealFeed.html',
})
export class DealFeedCmp extends HasAPI {
	constructor(title: Title, public api: Sway) {
		super(api);
		title.setTitle('Deal Feed');
	}
}

// DealFeed
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Sway, HasAPI } from './sway';

@Component({
	selector: 'endorsement',
	templateUrl: './views/dealFeed.html',
})
export class DealFeedCmp extends HasAPI {
	public deals: any[];
	public featured: any;
	constructor(title: Title, public api: Sway) {
		super(api);
		title.setTitle('Deal Feed');

		// discuss the EP with Shahzil
		this.api.Get('getDeals/' + this.user.id + '/0/0', data => {
			// data.forEach(v => console.log(v)); // uncomment to see how the data looks like
			this.deals = data || [];

			let featured: any;
			for (let d of this.deals) {
				if (!featured || featured.spendable < d.spendable) {
					featured = d;
				}
			}
			this.featured = featured;

		}, err => this.AddNotification('error', err.msg));
	}

	toggleMenu() {
		$('menu').slideToggle(500);
	}
}

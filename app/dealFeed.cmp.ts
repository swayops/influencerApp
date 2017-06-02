// DealFeed
import { Component } from '@angular/core';
import { DomSanitizer, SafeStyle, Title } from '@angular/platform-browser';

import { HasAPI, Sway } from './sway';

import * as U from './utils';

declare var $: any;

@Component({
	selector: 'endorsement',
	templateUrl: './views/dealFeed.html',
})
export class DealFeedCmp extends HasAPI {
	public deals: any[];
	public featured: any;
	public featuredImage: SafeStyle;

	constructor(title: Title, public api: Sway, sanitizer: DomSanitizer) {
		super(api);
		title.setTitle('Deal Feed');

		this.api.Get('getDeals/' + this.user.id + '/0/0', (data) => {
			// data.forEach(v => console.log(v)); // uncomment to see how the data looks like
			this.deals = data || [];
			this.deals.sort(U.SortBy('-reqSub', 'campaignId'));

			let featured: any;
			for (const d of this.deals) {
				if (!featured || featured.spendable < d.spendable) {
					featured = d;
				}
			}
			this.featured = featured;
			if (featured && featured.cmpImg) {
				this.featuredImage = sanitizer.bypassSecurityTrustStyle('url(' + featured.cmpImg + ')');
			} else {
				this.featuredImage = sanitizer.bypassSecurityTrustStyle('url("./static/images/defaultFeatured.jpg")');
			}

		}, (err) => this.AddNotification('error', err.msg));
	}

	toggleMenu() {
		$('menu').slideToggle(500);
	}
}

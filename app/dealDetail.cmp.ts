// DealDetail
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Sway, HasAPI } from './sway';

@Component({
	selector: 'dealDetail',
	templateUrl: './views/dealDetail.html',
})
export class DealDetailCmp extends HasAPI {
	public deal: any = {};
	public err: any;
	constructor(title: Title, public api: Sway, route: ActivatedRoute) {
		super(api);
		title.setTitle('Deal Details');
		const dealID = route.snapshot.params['id'];

		this.api.Get('getDeal/' + this.user.id + '/' + dealID, data => {
			this.deal = data;
		}, err => this.err = err.msg);
	}

	Accept() {
		const d = this.deal,
			uid = this.user.id;
		// /assignDeal/:influencerId/:campaignId/:dealId/:platform
		this.api.Get('assignDeal/' + uid + '/' + d.campaignId + '/' + d.id + '/' + d.platforms[0], data => {
			this.deal = data;
		}, err => this.err = err.msg);
	}

	get DaysLeft(): string {
		const assigned = this.deal.assigned * 1000, // go times are in seconds
			now = Date.now(),
			days = (assigned - now) / oneDay;

		return (14 - days).toFixed(0);
	}
}

const oneDay = 24 * 66 * 66 * 1000;

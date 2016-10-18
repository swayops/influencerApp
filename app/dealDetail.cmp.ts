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
		console.log(route.snapshot.data);
		// TODO get a single deal endpoint
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
}

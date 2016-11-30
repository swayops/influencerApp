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
	public deal: any;
	public err: any;
	constructor(title: Title, public api: Sway, route: ActivatedRoute) {
		super(api);
		title.setTitle('Deal Details');
		const cmpID = route.snapshot.params['cid'],
			dealID = route.snapshot.params['id'];

		this.api.Get('getDeal/' + this.user.id + '/' + cmpID + '/' + dealID, data => {
			this.deal = data;
		}, err => this.err = err.msg);
	}

	get perkName(): string {
		let p = this.deal.perk,
			name = p.name || 'N/A';
		if (p.category) {
			name += ', type: ' + p.category;
		}
		return name;
	}
	Accept() {
		const d = this.deal,
			uid = this.user.id;
		// /assignDeal/:influencerId/:campaignId/:dealId/:platform
		this.api.Get('assignDeal/' + uid + '/' + d.campaignId + '/' + d.id + '/' + d.platforms[0], data => {
			this.SetData('deal:' + data.assigned, data);
			this.api.GoTo('acceptedDealAlert', data.assigned);
		}, err => this.err = err.msg);
	}
}

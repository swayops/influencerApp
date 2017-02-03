// DealDetail
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { ModalEvent } from './modal';
import { HasAPI, Sway } from './sway';
import { InfInfo } from './utils';

@Component({
	selector: 'dealDetail',
	templateUrl: './views/dealDetail.html',
})
export class DealDetailCmp extends HasAPI {
	public confirmButtons = [
		{ name: 'Confirm', class: 'btn-primary', click: (evt) => this.Accept(evt), xdisabledIf: () => this.info.missing },
		{ name: 'Edit Profile', class: 'btn-default ghost', click: (_) => this.api.GoTo('/editProfile') },
	];

	public deal: any;
	public err: any;
	private info_: any;

	constructor(title: Title, public api: Sway, route: ActivatedRoute) {
		super(api);
		title.setTitle('Deal Details');
		const cmpID = route.snapshot.params['cid'],
			dealID = route.snapshot.params['id'];

		this.api.Get('getDeal/' + this.user.id + '/' + cmpID + '/' + dealID, (data) => {
			this.deal = data;
		}, (err) => this.err = err.msg);
	}

	get info(): any {
		if (!this.info_) this.info_ = InfInfo(this.user);
		return this.info_ || {};
	}

	Accept(evt: ModalEvent) {
		evt.dlg.hide();
		const d = this.deal,
			uid = this.user.id;
		// /assignDeal/:influencerId/:campaignId/:dealId/:platform
		this.api.Get('assignDeal/' + uid + '/' + d.campaignId + '/' + d.id + '/' + d.platforms[0], (data) => {
			this.SetData('deal:' + data.assigned, data);
			this.api.GoTo('acceptedDealAlert', data.assigned);
		}, (err) => this.err = err.msg);
	}
}

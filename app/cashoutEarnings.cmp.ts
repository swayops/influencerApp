// Cashout Earnings
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Sway, HasAPI } from './sway';

@Component({
	selector: 'cashoutEarnings',
	templateUrl: './views/cashoutEarnings.html',
})
export class CashoutEarningsCmp extends HasAPI {
	constructor(title: Title, public api: Sway, route: ActivatedRoute) {
		super(api);
		title.setTitle('Cashout Earnings');
	}

	get amount(): number {
		return this.user.inf.pendingPayout || 0;
	}

	Cashout() {
		if (this.amount === 0) {
			this.api.GoTo('earningStats');
			return;
		}

		this.api.Get('requestCheck/' + this.user.id, resp => {
			this.AddNotification('info', 'Check your email for the documents!');
			this.api.GoTo('earningStats');
		}, err => {
			this.AddNotification('error', err.msg);
		});
	}
}

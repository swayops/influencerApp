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
		if (this.user.inf.hasSigned) {
			this.api.Get('requestCheck/' + this.user.id, resp => {
				this.AddNotification('info', `
You've successfully requested a check be sent to your address.
Please wait up to 48 hours for an admin to approve your payment and a check will be on it's way.
You will receive an email once the admin has approved.
`);
				this.api.GoTo('earningStats');
			}, err => {
				this.AddNotification('error', err.msg);
			});
		} else {
			this.api.Get('emailTaxForm/' + this.user.id, resp => {
				this.AddNotification('success', `
Tax forms have been emailed to you. Please check your spam folder as well.
Once these have been completed you will be eligible for payment.
`);
				this.api.GoTo('earningStats');
			}, err => {
				this.AddNotification('error', err.msg);
			});
		}
	}
}

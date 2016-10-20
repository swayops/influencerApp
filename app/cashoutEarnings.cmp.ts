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
	private ts: number;
	constructor(title: Title, public api: Sway, route: ActivatedRoute) {
		super(api);
		title.setTitle('Cashout Earnings');
		this.ts = parseInt(route.snapshot.params['ts']);
	}
}

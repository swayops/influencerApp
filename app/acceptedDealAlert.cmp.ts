// AcceptedDealAlert
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Sway, HasAPI } from './sway';

@Component({
	selector: 'acceptedDealAlert',
	templateUrl: './views/acceptedDealAlert.html',
})
export class AcceptedDealAlertCmp extends HasAPI {
	private ts: number;
	public perk: any;
	constructor(title: Title, public api: Sway, route: ActivatedRoute) {
		super(api);
		title.setTitle('Accepted Deal Alert');
		this.ts = parseInt(route.snapshot.params['ts']);
		this.perk = this.GetData('deal:' + this.ts, {}, true);

	}

	get DaysLeft(): string {
		const assigned = this.ts * 1000, // go times are in seconds
			now = Date.now(),
			days = (assigned - now) / oneDay;

		return (14 - days).toFixed(0);
	}
}

const oneDay = 24 * 66 * 66 * 1000;

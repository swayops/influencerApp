// AcceptedDealAlert
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Sway, HasAPI } from './sway';

@Component({
	selector: 'acceptedDealAlert',
	templateUrl: './views/acceptedDealAlert.html',
})
export class AcceptedDealAlertCmp extends HasAPI {
	constructor(title: Title, public api: Sway) {
		super(api);
		title.setTitle('Accepted Deal Alert');
	}
}

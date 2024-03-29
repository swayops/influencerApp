// PendingDeal
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Sway, HasAPI } from './sway';

@Component({
	selector: 'deals',
	templateUrl: './views/deals.html',
})
export class DealsCmp extends HasAPI {
	public pendingTab = false;
	public pending: any[] = [];
	public completed: any[] = [];

	constructor(title: Title, public api: Sway) {
		super(api);
		title.setTitle('Deals');
		this.api.Get('getDealsAssigned/' + this.user.id, resp => this.pending = resp || []);
		this.api.Get('getDealsCompleted/' + this.user.id, resp => this.completed = resp || []);
		this.pendingTab = location.hash === '#pending';
	}
}

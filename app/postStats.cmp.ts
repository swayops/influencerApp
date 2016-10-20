// PostStats
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Sway, HasAPI } from './sway';

import { DateString } from './utils';

@Component({
	selector: 'postStats',
	templateUrl: './views/postStats.html',
})
export class PostStatsCmp extends HasAPI {
	public today = {};
	public allTime = {};
	constructor(title: Title, public api: Sway, route: ActivatedRoute) {
		super(api);
		title.setTitle('Post Stats');

		const dealID = route.snapshot.params['id'];
		this.api.Get('getCompletedDeal/' + this.user.id + '/' + dealID, resp => this.setStats(resp || {}));
	}

	private setStats(data: any) {
		const stats = data.stats,
			today = DateString(1); // yesterday for now, should change to 0 for production
		if (!stats) return;
		for (let [day, stat] of Object.entries(stats)) {
			if (day === today) this.today = stat;
			for (let [k, v] of Object.entries(stat)) {
				if (typeof v !== 'number') continue;
				this.allTime[k] = (this.allTime[k] || 0) + v;
			}
		}
		console.log(this.today);
	}
}

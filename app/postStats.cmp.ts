// PostStats
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { HasAPI, Sway } from './sway';

import { DateString, Iter } from './utils';

@Component({
	selector: 'postStats',
	templateUrl: './views/postStats.html',
})
export class PostStatsCmp extends HasAPI {
	public today: any = {};
	public allTime: any = {};
	constructor(title: Title, public api: Sway, route: ActivatedRoute) {
		super(api);
		title.setTitle('Post Stats');

		const dealID = route.snapshot.params['id'];
		this.api.Get('getCompletedDeal/' + this.user.id + '/' + dealID, (resp) => this.setStats(resp || {}));
	}

	private setStats(data: any) {
		const stats = data.stats,
			today = DateString(0);
		if (!stats) return;
		Iter(stats, (day, stat) => {
			if (day === today) this.today = stat;
			Iter(stat, (k, v) => {
				if (typeof v !== 'number') return;
				this.allTime[k] = (this.allTime[k] || 0) + v;
			});
		});
	}
}

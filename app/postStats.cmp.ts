// PostStats
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Sway, HasAPI } from './sway';

@Component({
	selector: 'postStats',
	templateUrl: './views/postStats.html',
})
export class PostStatsCmp extends HasAPI {
	public data: any = {};
	constructor(title: Title, public api: Sway, route: ActivatedRoute) {
		super(api);
		title.setTitle('Post Stats');

		const dealID = route.snapshot.params['id'];
		this.api.Get('getCompletedDeal/' + this.user.id + '/' + dealID, resp => this.data = resp);
	}
}

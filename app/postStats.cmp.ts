// PostStats
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Sway, HasAPI } from './sway';

@Component({
	selector: 'postStats',
	templateUrl: './views/postStats.html',
})
export class PostStatsCmp extends HasAPI {
	constructor(title: Title, public api: Sway) {
		super(api);
	}
}

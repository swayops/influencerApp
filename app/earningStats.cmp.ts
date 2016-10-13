// EarningStats
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Sway, HasAPI } from './sway';

@Component({
	selector: 'earningStats',
	templateUrl: './views/earningStats.html',
})
export class EarningStatsCmp extends HasAPI {
	constructor(title: Title, public api: Sway) {
		super(api);
		title.setTitle('Earning Stats');
	}
}

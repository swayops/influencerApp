// DealDetail
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Sway, HasAPI } from './sway';

@Component({
	selector: 'dealDetail',
	templateUrl: './views/dealDetail.html',
})
export class DealDetailCmp extends HasAPI {
	constructor(title: Title, public api: Sway) {
		super(api);
		title.setTitle('Deal Details');
	}
}

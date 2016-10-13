// BrandPage
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Sway, HasAPI } from './sway';

@Component({
	selector: 'brandPage',
	templateUrl: './views/brandPage.html',
})
export class BrandPageCmp extends HasAPI {
	constructor(title: Title, public api: Sway) {
		super(api);
		title.setTitle('Brand Page');
	}
}

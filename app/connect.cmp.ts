// Connect
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Sway, HasAPI } from './sway';

@Component({
	selector: 'connect',
	templateUrl: './views/connect.html',
})
export class ConnectCmp extends HasAPI {
	constructor(title: Title, public api: Sway) {
		super(api);
		title.setTitle('Connect Your Social Accounts');
	}
}

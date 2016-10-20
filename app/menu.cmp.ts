// Menu
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Sway, HasAPI } from './sway';

@Component({
	selector: 'menu',
	templateUrl: './views/menu.html',
})
export class MenuCmp extends HasAPI {
	constructor(title: Title, public api: Sway) {
		super(api);
		//title.setTitle('Menu');
	}
}

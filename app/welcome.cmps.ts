// Welcome
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Sway, HasAPI } from './sway';

@Component({
	selector: 'welcome',
	templateUrl: './views/welcome.html',
})
export class WelcomeCmp extends HasAPI {
	constructor(title: Title, public api: Sway) {
		super(api);
		title.setTitle('Welcome To Sway');
	}
}

@Component({
	selector: 'walkthrough1',
	templateUrl: './views/walkthrough1.html',
})
export class Walkthrough1Cmp extends HasAPI {
	constructor(title: Title, public api: Sway) {
		super(api);
		title.setTitle('Walk Through 1');
	}
}

@Component({
	selector: 'walkthrough2',
	templateUrl: './views/walkthrough2.html',
})
export class Walkthrough2Cmp extends HasAPI {
	constructor(title: Title, public api: Sway) {
		super(api);
		title.setTitle('Walk Through 2');
	}
}

@Component({
	selector: 'walkthrough3',
	templateUrl: './views/walkthrough3.html',
})
export class Walkthrough3Cmp extends HasAPI {
	constructor(title: Title, public api: Sway) {
		super(api);
		title.setTitle('Walk Through 3');
	}
}


@Component({
	selector: 'walkthrough4',
	templateUrl: './views/walkthrough4.html',
})
export class Walkthrough4Cmp extends HasAPI {
	constructor(title: Title, public api: Sway) {
		super(api);
		title.setTitle('Walk Through 4');
	}
}


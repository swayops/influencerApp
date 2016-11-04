// Influencer
import { Component, AfterViewInit } from '@angular/core';
import { Title, DomSanitizer } from '@angular/platform-browser';

import { Sway, HasAPI } from './sway';

import $ from 'jquery';

@Component({
	selector: 'influencer',
	templateUrl: './views/influencer.html',
})
export class InfluencerCmp extends HasAPI implements AfterViewInit {
	public bio: any = {};
	constructor(title: Title, public api: Sway, public sanitizer: DomSanitizer) {
		super(api);
		title.setTitle('Influencer');
		this.api.Get('bio/' + this.user.id, resp => this.bio = resp || {});
	}

	ngAfterViewInit() {
		const url = this.user.coverImageUrl;
		// fuck you angular and your bs xss overprotection
		if (url) $('.influencer-page-banner').attr('style', 'background-image: url(' + url + ')');
	}

}

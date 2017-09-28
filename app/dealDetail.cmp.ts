// DealDetail
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { CropperSettings, ImageCropperComponent } from 'ng2-img-cropper';
import { ModalEvent } from './modal';
import { HasAPI, Sway } from './sway';
import { InfInfo } from './utils';

@Component({
	selector: 'dealDetail',
	templateUrl: './views/dealDetail.html',
})
export class DealDetailCmp extends HasAPI {
	public confirmButtons = [
		{
			name: 'Confirm And Accept',
			class: 'btn-primary',
			click: (evt) => this.Accept(evt),
			xdisabledIf: () => this.info.missing,
		},
		{ name: 'Edit Profile', class: 'btn-default ghost', click: (_) => this.api.GoTo('/editProfile') },
	];

	public selImageButtons = [
		{ name: 'Cancel', class: 'btn-default ghost' },
		{ name: 'Save & crop image »', class: 'btn-primary', click: (evt) => this.setImage(evt) },
	];

	public cropperSettings = {
		...new CropperSettings(),
		keepAspect: true,
		responsive: true,
		noFileInput: true,
		canvasWidth: 500,
		canvasHeight: 300,
		croppedWidth: 750,
		croppedHeight: 389,
	};

	public deal: any;
	public agreed: boolean = false;
	public err: any;
	public loading = false;
	private info_: any;
	public cropData: any = {};
	public data: any = {
		caption: '',
		imgData: new Array<string>(),
		content: new Array<string>(),
	};

	constructor(title: Title, public api: Sway, route: ActivatedRoute) {
		super(api);
		title.setTitle('Deal Details');
		const cmpID = route.snapshot.params['cid'],
			dealID = route.snapshot.params['id'];

		this.api.Get(
			'getDeal/' + this.user.id + '/' + cmpID + '/' + dealID,
			(data) => {
				if (!data.terms || data.assigned) this.agreed = true;
				this.deal = data;
				const sub = data.submission;
				if (sub && sub.caption) {
					this.data.caption = sub.caption;
					if (Array.isArray(sub.content)) this.data.content = sub.content;
				}
			},
			(err) => (this.err = err.msg),
		);
	}

	get info(): any {
		if (!this.info_) this.info_ = InfInfo(this.user);
		return this.info_ || {};
	}

	loadImage(cropper: ImageCropperComponent, e: any) {
		e.stopPropagation();
		e.preventDefault();

		const image = new Image(),
			file = (e.target.files || e.dataTransfer.files)[0],
			rd = new FileReader();

		rd.onloadend = (evt: any) => {
			image.src = evt.target.result;
			cropper.setImage(image);
		};

		rd.readAsDataURL(file);
	}

	setImage(evt: ModalEvent) {
		evt.Cancel();
		evt.dlg.hide();
		this.data.imgData[evt.data] = this.cropData.image;
	}

	submitPost() {
		this.loading = true;
		const payload = { ...this.data };
		payload.content = payload.content.filter((v) => v !== 'X' && v.length > 0);
		payload.imgData = payload.imgData.filter((v) => v !== 'X' && v.length > 0);
		this.api.Post(
			'submitPost/' + this.user.id + '/' + this.deal.campaignId,
			payload,
			(data) => {
				this.api.GoHome();
				this.AddNotification('success', submitSuccess);
				this.ScrollToTop();
			},
			(err) => {
				this.err = err.msg;
				this.loading = false;
			},
		);
		return;
	}

	Accept(evt: ModalEvent) {
		evt.dlg.hide();
		const d = this.deal,
			uid = this.user.id;
		// /assignDeal/:influencerId/:campaignId/:dealId/:platform=
		this.api.Get(
			'assignDeal/' + uid + '/' + d.campaignId + '/' + d.id + '/' + d.platforms[0],
			(data) => {
				this.SetData('deal:' + data.assigned, data);
				this.api.GoTo('acceptedDealAlert', data.assigned);
			},
			(err) => (this.err = err.msg),
		);
	}
}

const submitSuccess = `Your post draft has been submitted!
You should receive correspondence within the next 2- 3 days as the advertiser will either approve your post submission or request changes.`;

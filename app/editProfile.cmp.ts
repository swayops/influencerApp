// EditProfile
import { Component, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import {  Modal, ModalEvent } from './modal';

import { Sway, HasAPI } from './sway';

@Component({
	selector: 'editProfile',
	templateUrl: './views/editProfile.html',
})
export class EditProfileCmp extends HasAPI {
	public selImageButtons = [
		{name: 'Cancel', class: 'btn-default ghost'},
		{name: 'Save & crop image »', class: 'btn-primary', click: evt => this.setImage(evt)},
	];
	public data: any;
	public loading = false;

	public cropperSettings = Object.assign(new CropperSettings(), {
		keepAspect: true,
		responsive: true,
		noFileInput: true,
		canvasWidth: 300,
		canvasHeight: 300,
		croppedWidth: 300,
		croppedHeight: 300,
		minHeight: 300,
	});
	public coverCropperSettings = Object.assign(new CropperSettings(), {
		keepAspect: true,
		responsive: true,
		noFileInput: true,
		canvasWidth: 750,
		canvasHeight: 375,
		croppedWidth: 750,
		croppedHeight: 375,
		minHeight: 375,
	});

	public cropData: any = {};
	public coverData: any = {};

	constructor(title: Title, public api: Sway) {
		super(api);
		title.setTitle('Edit Profile');
		const u = this.user,
			inf = u.inf || {};
		inf.address = inf.address || {};
		this.data = {
			name: u.name,
			imageUrl: u.imageUrl,
			coverImageUrl: u.coverImageUrl,
			email: u.email,
			gender: inf.male ? 'm' : inf.female ? 'f' : '',
			dealPing: inf.dealPing,
			instagram: inf.instagram && inf.instagram.userName,
			youtube: inf.youtube && inf.youtube.userName,
			twitter: inf.twitter && inf.twitter.id,
			facebook: inf.facebook && inf.facebook.id,
			// categories: inf.categories,
			address: {
				address_line1: inf.address.address_line1,
				address_line2: inf.address.address_line2,
				address_city: inf.address.address_city,
				address_state: inf.address.address_state,
				address_zip: inf.address.address_zip,
				address_country: inf.address.address_country,
			},
		};
		this.api.Get('ip', data => this.data.ip = data.ip);
		this.cropperSettings.rounded = true;
	}

	ngAfterViewInit() {
		const url = this.data.coverImageUrl;
		// fuck you angular and your bs xss overprotection
		if (url) $('.overlay').attr('style', 'background-image: url(' + url + '); background-size: cover;');
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
		if (evt.data === 'profile') {
			this.data.imageUrl = this.cropData.image;
		} else if (evt.data === 'cover') {
			this.data.coverImageUrl = this.coverData.image;
		}
		this.ngAfterViewInit();
		this.cropData.image = '';
		this.coverData.image = '';
	}

	Save() {
		this.loading = true;
		this.api.Put('influencer/' + this.user.id, this.data, resp => {
			this.api.ReloadUser();
			this.api.GoHome();
			this.AddNotification('success', 'Successfully updated your profile!');
		}, err => {
			this.loading = false;
			this.AddNotification('error', err.msg);
			this.ScrollToTop(100);
		});
	}
}

import { Title, BrowserModule } from '@angular/platform-browser';
import { NgModule, enableProdMode, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppCmp, NotFoundCmp } from './app.cmp';
import { AuthGuard, Sway } from './sway';

import { LoginCmp } from './login.cmp';
import { SignupCmp } from './signup.cmp';
import { EditProfileCmp } from './editProfile.cmp';
// import { ForgotPasswordCmp } from './forgotPassword';

import * as W from './welcome.cmps';

import { MenuCmp } from './menu.cmp';
import { InfluencerCmp } from './influencer.cmp';
import { ConnectCmp } from './connect.cmp';
import { BrandPageCmp } from './brandPage.cmp';

import { DealsCmp } from './deals.cmp';
import { PostStatsCmp } from './postStats.cmp';
import { EarningStatsCmp } from './earningStats.cmp';
import { DealFeedCmp } from './dealFeed.cmp';
import { DealDetailCmp } from './dealDetail.cmp';
import { AcceptedDealAlertCmp } from './acceptedDealAlert.cmp';
import { CashoutEarningsCmp } from './cashoutEarnings.cmp';

import { FilterArrayPipe, FormatNumberPipe } from './utils';

import { Modal } from './modal';

import { ImageCropperModule } from 'ng2-img-cropper';

declare var PRODUCTION: boolean;

if (PRODUCTION) {
	enableProdMode();
}

@Component({
	selector: 'home',
	template: '<div></div>',
})
export class HomeCmp { constructor(api: Sway) { api.GoHome(); } }

export const ALL_ROUTES = [
	{
		path: '',
		redirectTo: '/home',
		pathMatch: 'full',
	},
	{
		path: 'home',
		component: HomeCmp,
		canActivate: [AuthGuard],
	},
	{
		path: 'editProfile',
		component: EditProfileCmp,
		canActivate: [AuthGuard],
	},
	{
		path: 'influencer',
		component: InfluencerCmp,
		canActivate: [AuthGuard],
	},
	// TODO: merge in 1 component
	{
		path: 'welcome',
		component: W.WelcomeCmp,
		canActivate: [AuthGuard],
	},
	{
		path: 'walkthrough/1',
		component: W.Walkthrough1Cmp,
		canActivate: [AuthGuard],
	},
	{
		path: 'walkthrough/2',
		component: W.Walkthrough2Cmp,
		canActivate: [AuthGuard],
	},
	{
		path: 'walkthrough/3',
		component: W.Walkthrough3Cmp,
		canActivate: [AuthGuard],
	},
	{
		path: 'walkthrough/4',
		component: W.Walkthrough4Cmp,
		canActivate: [AuthGuard],
	},
	// end TODO
	{
		path: 'connect',
		component: ConnectCmp,
		canActivate: [AuthGuard],
	},
	{
		path: 'postStats/:id',
		component: PostStatsCmp,
		canActivate: [AuthGuard],
	},
	{
		path: 'deals',
		component: DealsCmp,
		canActivate: [AuthGuard],
	},
	{
		path: 'earningStats',
		component: EarningStatsCmp,
		canActivate: [AuthGuard],
	},
	{
		path: 'dealFeed',
		component: DealFeedCmp,
		canActivate: [AuthGuard],
	},
	{
		path: 'dealDetail/:cid/:id',
		component: DealDetailCmp,
		canActivate: [AuthGuard],
	},
	{
		path: 'acceptedDealAlert/:ts',
		component: AcceptedDealAlertCmp,
		canActivate: [AuthGuard],
	},
	{
		path: 'cashoutEarnings',
		component: CashoutEarningsCmp,
		canActivate: [AuthGuard],
	},
	// {
	// 	path: 'menu',
	// 	component: MenuCmp,
	// 	canActivate: [AuthGuard],
	// },
	{
		path: 'brandPage',
		component: BrandPageCmp,
		canActivate: [AuthGuard],
	},
	{
		path: 'login',
		component: LoginCmp,
	},
	{
		path: 'forceLogin/:id',
		component: LoginCmp,
	},
	{
		path: 'signup',
		component: SignupCmp,
	},
	{
		path: 'signup/:inviteCode',
		component: SignupCmp,
	},
	// {
	// 	path: 'resetPassword/:token',
	// 	component: ResetPasswordCmp,
	// },
	// {
	// 	path: 'forgotPassword',
	// 	component: ForgotPasswordCmp,
	// },
	// {
	// 	path: 'resetPassword/:uuid',
	// 	component: ForgotPasswordCmp,
	// },
	{
		path: '**',
		component: NotFoundCmp,
	},
];

@NgModule({
	declarations: [
		AppCmp, // app

		HomeCmp,
		EditProfileCmp,
		InfluencerCmp,
		W.WelcomeCmp,
		W.Walkthrough1Cmp,
		W.Walkthrough2Cmp,
		W.Walkthrough3Cmp,
		W.Walkthrough4Cmp,
		ConnectCmp,
		PostStatsCmp,
		DealsCmp,
		EarningStatsCmp,
		DealFeedCmp,
		DealDetailCmp,
		AcceptedDealAlertCmp,
		CashoutEarningsCmp,
		BrandPageCmp,
		LoginCmp,
		SignupCmp,
		NotFoundCmp,


		// pipes and utils
		FilterArrayPipe,
		FormatNumberPipe,

		Modal,
		MenuCmp,
	],

	imports: [
		BrowserModule,
		RouterModule.forRoot(ALL_ROUTES),
		FormsModule,
		HttpModule,
		ImageCropperModule,
	],

	providers: [
		Title,
		Sway,
		AuthGuard,
	],

	bootstrap: [AppCmp],
})
export class AppModule { }

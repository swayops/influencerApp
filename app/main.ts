import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Title, BrowserModule } from '@angular/platform-browser';
import { NgModule, enableProdMode } from '@angular/core';
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

import { PendingDealCmp } from './pendingDeal.cmp';
import { PostStatsCmp } from './postStats.cmp';
import { EarningStatsCmp } from './earningStats.cmp';
import { DealFeedCmp } from './dealFeed.cmp';
import { DealDetailCmp } from './dealDetail.cmp';
import { AcceptedDealAlertCmp } from './acceptedDealAlert.cmp';

// import { FilterArrayPipe } from './utils';

import { ImageCropperComponent } from 'ng2-img-cropper';

declare var PRODUCTION: boolean;

if (PRODUCTION) {
	enableProdMode();
}

export const ALL_ROUTES = [
	{
		path: '',
		redirectTo: '/dashboard',
		pathMatch: 'full',
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
		path: 'pendingDeals/:id',
		component: PendingDealCmp,
		canActivate: [AuthGuard],
	},
	{
		path: 'earningStats/:id',
		component: EarningStatsCmp,
		canActivate: [AuthGuard],
	},
	{
		path: 'dealFeed',
		component: DealFeedCmp,
		canActivate: [AuthGuard],
	},
	{
		path: 'dealDetail/:id',
		component: DealDetailCmp,
		canActivate: [AuthGuard],
	},
	{
		path: 'acceptedDealAlert/:id',
		component: AcceptedDealAlertCmp,
		canActivate: [AuthGuard],
	},
	{
		path: 'menu',
		component: MenuCmp,
		canActivate: [AuthGuard],
	},
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

		// pipes and utils
		// FilterArrayPipe,

		ImageCropperComponent,
	].concat(ALL_ROUTES.map(v => (<any> v).component).filter(v => !!v)),

	imports: [
		BrowserModule,
		RouterModule.forRoot(ALL_ROUTES),
		FormsModule,
		HttpModule,
	],

	providers: [
		Title,
		Sway,
		AuthGuard,
	],
	bootstrap: [AppCmp],
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);

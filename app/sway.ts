// this a copy from dashboard/app/sway.ts, any updates there should be copied here

import { Injectable, Output } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';

declare var $: any;

export const apiURL = '/api/v1/';

const errInfOnly = {
	msg: 'Oops! This login is for influencers only. Please visit SwayOps.com for all business solutions.',
	code: 401, status: 'error',
};

@Injectable()
export class Sway {
	public mainUser: User;
	public curUser: User;
	public loginStatus = 0;
	private userEndpoint = 'user';
	error: any;
	redirectUrl: string;

	constructor(public router: Router, public http: Http) {
		this.IsLoggedIn.subscribe((v) => this.loginStatus = v ? 1 : 0);
	}

	Login(info: { email: string, pass: string }, onError?: (err: any) => void) {
		this.Reset();
		return this.Post('signIn', info, (data) => {
			return this.ReloadUser(true, onError);
		}, onError);
	}

	ForceUser(id: string, onError?: (err: any) => void) {
		this.userEndpoint = 'user/' + id;
		this.ReloadUser(true, onError);
	}

	ReloadUser(redir = false, onError?: (err: any) => void) {
		return this.Get(this.userEndpoint, (user) => {
			if (!user.inf) {
				if (onError) onError(errInfOnly);
				return;
			}
			this.mainUser = user;
			if (redir) {
				if (this.redirectUrl) {
					this.GoTo(this.redirectUrl);
				} else {
					this.GoHome();
				}
				this.redirectUrl = '';
				this.loginStatus = 1;
			}
		}, onError);
	}

	SignUp(info: SignUpInfo, onError?: (err: any) => void) {
		return this.Post('signUp?autologin=true', info, (data) => this.GoTo('welcome'), onError);
	}

	ForgotPassword(data: any, onSuccess?: (data: any) => void, onError?: (err: any) => void) {
		return this.req('post', 'forgotPassword', data).subscribe(onSuccess, onError);
	}

	Get(ep: string, onResp: (data: any) => void, onErr?: (err: any) => void) {
		return this.req('get', ep).subscribe((data) => onResp(data), onErr);
	}

	Post(ep: string, payload: any, onResp: (data: any) => void, onErr?: (err: any) => void) {
		return this.req('post', ep, payload).subscribe((data) => onResp(data), onErr);
	}

	Put(ep: string, payload: any, onResp: (data: any) => void, onErr?: (err: any) => void) {
		return this.req('put', ep, payload).subscribe((data) => onResp(data), onErr);
	}

	SetCurrentUser(id?: string): Promise<User> {
		if (id == null) {
			this.curUser = null;
			return Promise.resolve(this.mainUser);
		}
		if (id === this.CurrentUser.id) {
			return Promise.resolve(this.CurrentUser);
		}
		return new Promise((resolve, reject) => {
			this.Get('user/' + id, (user) => { this.curUser = user; resolve(user); }, (err) => reject(err));
		});
	}

	Logout(redir = true) {
		return this.Get('signOut', () => {
			this.Reset();
			if (redir) this.router.navigate(['/login']); // should say something maybe?
		}, () => { /* ignored */ });
	}

	GoHome() {
		const inf = this.CurrentUser.inf || {};
		const hasSocial = inf.twitter || inf.facebook || inf.instagram || inf.youtube;
		if (hasSocial) {
			this.GoTo('/dealFeed');
		} else {
			this.GoTo('/connect');
		}
	}

	GoTo(...args: string[]) {
		this.router.navigate(args);
	}

	Reset() {
		this.mainUser = this.curUser = null;
		this.loginStatus = 0;

	}

	public req(method: string, ep: string, body?: any): Observable<any> {
		this.error = null;
		const headers = new Headers({ 'Content-Type': 'application/json' });
		const options = new RequestOptions({ headers: headers });
		return this.http[method.toLocaleLowerCase()](apiURL + ep, body, options).map((res) => res.json())
			.catch((err) => this.handleError(err));
	}

	public handleError(err: Response): Observable<{}> {
		let errData = err.json();
		if ('target' in errData) {
			errData = { status: 'error', msg: 'Connection Error' };
		}
		this.error = errData;
		if (this.error.code === 401) this.loginStatus = 2;
		return Observable.throw(errData);
	}

	get IsLoggedIn(): Observable<boolean> {
		// if (this.loginStatus > 0) return Observable.of(this.loginStatus === 1);
		return Observable.create((obs) => {
			const sub = this.Get(this.userEndpoint, (user) => {
				this.mainUser = user;
				this.loginStatus = 1;
				return obs.next(true);
			}, (err) => {
				if (err.code === 401) this.error = null; // ignore 401 for this func
				this.loginStatus = 2;
				obs.next(false);
			});
			return () => sub.unsubscribe();
		}).take(1);
	}

	get User(): User { return this.mainUser; }
	get CurrentUser(): User {
		const u = this.curUser || this.mainUser;
		if (u && !u.inf) {
			this.Logout(true);
		}
		return u;
	}

	IsAsUser(): boolean {
		return this.User.admin && !!this.curUser && this.User.id !== this.curUser.id;
	}
}

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(public router: Router, public api: Sway) { }

	// TODO check if a certain user can open a certain page or not
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
		return this.api.IsLoggedIn.map((logged) => {
			if (logged && (!this.api.error || this.api.error.code !== 401)) return true;
			this.api.redirectUrl = state.url;
			this.router.navigate(['/login']);
			return false;
		});
	}

}

let allNotifications: Notification[] = [];
const globalData: { [key: string]: any } = {};
export class HasAPI {
	constructor(protected api: Sway) { }
	get user() { return this.api.CurrentUser; }

	set error(err) { this.api.error = err; }
	@Output() get error() { return this.api.error; }

	get notifications() {
		allNotifications.forEach((v) => {
			if (v.timeout > 0) setTimeout(() => v.timeout = -1, v.timeout);
		});
		allNotifications = allNotifications.filter((v) => v.timeout !== -1);
		return allNotifications;
	}

	// if no timeout is specified, it defaults to 10s
	AddNotification(type: string, msg: any, timeout: number = null) {
		if (timeout == null) timeout = 10000;
		if (typeof msg === 'object' && 'msg' in msg) msg = msg.msg;
		if (type === 'error') {
			type = 'danger'; // workaround for bootstrap notifications
			this.ScrollToTop(200);
		}
		allNotifications.push({ type, msg, timeout });
	}

	ResetNotifications() {
		allNotifications = [];
	}

	ScrollToTop(speed: number = 800) {
		$('body,html').animate({
			scrollTop: 0,
		}, speed);
	}

	get HasCompleteProfile(): boolean {
		const inf = this.user.inf || {};
		return (inf.male || inf.female) && !!inf.categories;
	}

	get HasAddress(): boolean {
		const inf = this.user.inf || {};
		return !!inf.address;
	}

	SetData(k: string, v: any) {
		globalData[k] = v;
	}

	GetData(k: string, defVal?: any, remove?: boolean): any {
		const v = globalData[k] || defVal;
		if (remove) delete globalData[k];
		return v;
	}
}

export interface SignUpInfo {
	name: string;
	email: string;
	pass: string;
	pass2?: string;
	advertiser: {
		dspFee: number;
	};
}

interface Notification {
	type: string;
	msg: string;
	timeout: number;
}

interface User {
	id: string;
	parentId: string;
	name: string;
	imageUrl: string;
	coverImageUrl: string;
	email: string;
	phone: string;
	address: string;
	status: boolean;
	createdAt: number;
	updatedAt: number;

	admin?: boolean;

	adAgency?: any;
	talentAgency?: any;
	advertiser?: any;
	hasCmps?: boolean;
	inf?: any;
}

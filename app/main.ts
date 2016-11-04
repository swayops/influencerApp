import 'core-js/es6';
import 'core-js/es7/reflect';
import 'core-js/fn/array/includes';
import 'core-js/fn/object/assign';
import 'core-js/fn/object/entries';
import 'zone.js/dist/zone.min';

import 'rxjs/add/operator/map';

import 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

import { platformBrowser }    from '@angular/platform-browser';
import { AppModuleNgFactory } from '../aot/app/app.module.ngfactory';
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);

// EarningStats
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Sway, HasAPI } from './sway';
import { LoadScripts } from './utils';

declare var AmCharts: any;

@Component({
	selector: 'earningStats',
	templateUrl: './views/earningStats.html',
})
export class EarningStatsCmp extends HasAPI {
	public data = {
		week: {},
		month: {},
		year: {},
	};

	constructor(title: Title, public api: Sway) {
		super(api);
		title.setTitle('Earning Stats');


		this.api.Get('getInfluencerStats/' + this.user.id + '/7',
			resp => this.data.week = resp);

		this.api.Get('getInfluencerStats/' +  this.user.id + '/30',
			resp => this.data.month = resp);

		this.api.Get('getInfluencerStats/' +  this.user.id + '/365',
			resp => this.data.year = resp);
	}

	ngAfterViewInit() {
		LoadScripts(amChartLibs, () => this.setupChart('week'));
	}


	setupChart(key: string) {
		if (typeof AmCharts.makeChart !== 'function') {
			setTimeout(() => this.setupChart(key), 250);
			return;
		}

		let data = this.data[key],
			chart = AmCharts.makeChart('chartdiv', {
				'type': 'serial',
				'theme': 'light',
				"synchronizeGrid":true,
				'marginRight': 5,
				'marginLeft': 5,
				'autoMarginOffset': 20,
				'mouseWheelZoomEnabled': true,
				'dataDateFormat': 'YYYY-MM-DD',
				'balloon': {
					'borderThickness': 1,
					'shadowAlpha': 0,
				},
				'graphs': [{
					'id': 'g1',
					'balloon': {
						'drop': true,
						'adjustBorderColor': false,
						'color': '#ffffff',
					},
					'bullet': 'circle',
					'bulletBorderAlpha': 1,
					'bulletColor': '#FFFFFF',
					"fillAlphas": 0.3,
        			"fillColorsField": '#FFFFFF',
					'bulletSize': 5,
					'hideBulletsCount': 50,
					'lineThickness': 2,
					'lineColor':'#009fe8',
					'title': 'red line',
					'useLineColorForBulletBorder': true,
					'valueField': 'value',
					'balloonText': '<span style="font-size:18px;">$[[value]]</span>',
				}],
				'chartCursor': {
					'pan': true,
					'valueLineEnabled': true,
					'valueLineBalloonEnabled': true,
					'cursorAlpha': 1,
					'cursorColor': '#258cbb',
					'limitToGraph': 'g1',
					'valueLineAlpha': 0.2,
					'valueZoomable': true,
					"fullWidth": true
				},
				'categoryField': 'date',
				'categoryAxis': {
					'parseDates': true,
					'dashLength': 1,
					'minorGridEnabled': true,
					"axisColor": "#fff"
				},
				'export': {
					'enabled': false,
				},
				'dataProvider': dataToChart(data),
			});
		console.log(dataToChart(data));
		function zoomChart() {
			chart.zoomToIndexes(chart.dataProvider.length - 40, chart.dataProvider.length - 1);
		}

		chart.addListener('rendered', zoomChart);

		zoomChart();
	}

}

function dataToChart(data: any): any[] {
	return Object.keys(data).filter(k => k !== 'total').map(k => {
		const v = data[k];
		return { date: k, value: (v.spent || 0).toFixed(2) };
	});
}

const amChartLibs = [
	'https://www.amcharts.com/lib/3/amcharts.js',
	'https://www.amcharts.com/lib/3/serial.js',
	'https://www.amcharts.com/lib/3/plugins/export/export.min.js',
	'https://www.amcharts.com/lib/3/themes/light.js',
];

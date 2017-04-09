import {getInitialData} from './app/server';

import Btn		from './app/Btn';
import Points	from './app/Points';

var btns = {};
var points = {qwe: 'qwe'};

function ready(fn) {
	if (document.readyState !== 'loading') {
		fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}

ready(() => {
	getInitialData(data => {
		points = new Points('points');
		points.value = data.current_points;

		data.actions.forEach(item => {
			btns[`btn${item.id}`] = new Btn(item, points, 'btns');
			btns[`btn${item.id}`].insertTo(document.getElementById('btns'));
		});
	});
});


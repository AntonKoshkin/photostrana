/* global BUNDLE */

import {numberToTime}	from './libs';
import {sendClick}		from './server';

export default class Btn {
	constructor(params, points, parentId) {
		this.pointsBlock = points;
		this.reward = params.points;
		this.id = params.id;

		this.parent = parentId ? document.getElementById(parentId) : null;
		this.cooldown = params.recovery_time;

		this.counting = false;
		this.countInterval = null;
		// this.restTime = numberToTime(params.rest_time);
		this.icon = document.createElement('div');
		this.icon.className = 'btn__icon';
		this.icon.style.backgroundImage = `url(${this.genBg(params.title)})`;

		this.counter = document.createElement('span');
		this.counter.className = 'btn__counter';
		this.counter.textContent = this._restTime;

		this.btn = document.createElement('button');
		this.btn.className = 'btn';
		// if (params.rest_time) {
		// 	this.btn.classList.add('btn--count');
		// }
		this.btn.id = `btn${params.id}`;

		this.btn.appendChild(this.icon);
		this.btn.appendChild(this.counter);

		this.restTime = params.rest_time;
	}
	genBg(iconName) {
		if (BUNDLE === 'static') {
			return `img/${iconName}.png`;
		}
		return `/img/${iconName}.png`;
	}
	set restTime(number) {
		this._restTime = number;
		this.counter.textContent = numberToTime(this._restTime);
		if (number && !this.counting) {
			this.btn.classList.add('btn--count');
			if (!this.counting) {
				this.countdown();
			}
		} else if (!number) {
			this.btn.classList.remove('btn--count');
		}
	}
	get restTime() {
		return this._restTime;
	}
	insertTo(parent) {
		if (parent) {
			parent.appendChild(this.btn);
		} else {
			this.parent.appendChild(this.btn);
		}
		this.btn.addEventListener('click', () => {
			if (!this.disabled) {
				this.click();
				console.log('click');
			}
		});
	}
	countdown() {
		this.counting = true;
		this.btn.disabled = true;
		this.countInterval = setInterval(() => {
			this.restTime = this._restTime - 1;
			if (!this._restTime) {
				clearInterval(this.countInterval);
				this.counting = false;
				this.btn.disabled = false;
			}
		}, 1000);
	}
	click() {
		sendClick(this.id, res => {
			if (res.success) {
				this.restTime = this.cooldown;
				this.pointsBlock.value += this.reward;
			}
		});
	}
}

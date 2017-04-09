export default class Points {
	constructor(parentId) {
		this._value = null;
		this.parent = document.getElementById(parentId);
	}
	set value(points) {
		this._value = points;
		this.parent.textContent = this._value;
	}
	get value() {
		return this._value;
	}
}

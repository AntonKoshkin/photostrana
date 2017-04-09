export function numberToTime(number) {
	let mins = Math.floor(number / 60);
	let secs = number % 60;
	if (secs < 10) {
		secs = '0' + secs;
	}

	return `${mins}:${secs}`;
}

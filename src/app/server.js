// абстрактный метод получения данных с сервера
export function getInitialData(cb, timeout) {
	// иммитация асинхрона
	setTimeout(() => {
		cb({
			current_points: 98,

			actions: [
				{
					id           : 145,
					title        : 'coffee',
					rest_time    : 0,
					recovery_time: 600,
					points       : 20,
				}, {
					id           : 146,
					title        : 'meat',
					rest_time    : 0,
					recovery_time: 660,
					points       : 20,
				}, {
					id           : 147,
					title        : 'watch',
					rest_time    : 394,
					recovery_time: 480,
					points       : 30,
				}, {
					id           : 147,
					title        : 'tornado',
					rest_time    : 0,
					recovery_time: 480,
					points       : 30,
				}
			],
		});
	}, timeout || 100);
}

// абстрактный метод отправки клика
export function sendClick(id, cb, timeout) {
	console.log(`sending click for ${id} btn`);
	// иммитация асинхрона
	setTimeout(() => {
		cb({success: true});
	}, timeout || 100);
}

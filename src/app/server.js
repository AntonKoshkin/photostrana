// абстрактный метод получения данных с сервера
export function getInitialData(cb, timeout) {
	// иммитация асинхрона
	setTimeout(() => {
		cb({
			current_points: 98,

			actions: [
				{
					id           : 145,
					title        : 'Test1',
					rest_time    : 0,
					recovery_time: 600,
					points       : 20,
					pathToIcon   : 'path/to/icon.png',
				}, {
					id           : 146,
					title        : 'Test2',
					// rest_time    : 428,
					rest_time    : 10,
					recovery_time: 660,
					points       : 20,
					pathToIcon   : 'path/thto/icon.png',
				}, {
					id           : 147,
					title        : 'Test3',
					rest_time    : 0,
					recovery_time: 480,
					points       : 30,
					pathToIcon   : 'path/thto/icon.png',
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

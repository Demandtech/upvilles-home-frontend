// export function debounce(func, wait) {
// 	let timeout = null;

// 	return function (...args) {
// 		clearTimeout(timeout);
// 		timeout = setTimeout(() => {
// 			func.apply(this, args);
// 		}, wait);
// 	};
// }

export function debounce<T extends (...args: any[]) => void>(
	func: T,
	wait: number
): (...args: Parameters<T>) => void {
	let timeout: ReturnType<typeof setTimeout> | null = null;

	return function (...args: Parameters<T>): void {
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(() => {
			func(...args);
		}, wait);
	};
}

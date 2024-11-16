export function addCommas(number: number): string {
	console.log(number)
	if (number === null || number === undefined) return "";

	const numberStr = number.toString();

	const parts = numberStr.split(".");

	const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

	if (parts.length > 1) {
		return integerPart + "." + parts[1];
	} else {
		return integerPart;
	}
}

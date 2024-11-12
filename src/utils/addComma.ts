export function addCommas(number: number) {
	if (number === null || number === undefined) return number;

	// Convert the number to a string
	const numberStr = number.toString();

	// Split the number into integer and decimal parts
	const parts = numberStr.split(".");

	// Format the integer part with commas
	const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

	// If there is a decimal part, rejoin it with the integer part
	if (parts.length > 1) {
		return integerPart + "." + parts[1];
	} else {
		return integerPart;
	}
}

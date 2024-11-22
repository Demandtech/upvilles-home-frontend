export function formatNaira(number: number, frac: number = 2) {
	return new Intl.NumberFormat("en-NG", {
		style: "currency",
		currency: "NGN",
		minimumFractionDigits: frac,
		maximumFractionDigits: frac,
	}).format(number);
}

export function formatCurrency(number: number) {
	if (!number || isNaN(number)) return "";

	const formattedCurrency = new Intl.NumberFormat("en-NG", {
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(number);

	return formattedCurrency;
}

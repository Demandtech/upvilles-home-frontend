export function formatNaira(number: number) {
	return new Intl.NumberFormat("en-NG", {
		style: "currency",
		currency: "NGN",
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(number);
}

export function formatCurrency(number: number) {
	return new Intl.NumberFormat("en-NG", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(number);
}

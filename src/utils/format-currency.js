export default (price) => (Math.abs(+price)).toLocaleString(`en-US`, {
	style: `currency`,
	currency: `USD`,
	minimumFractionDigits: 2,
	maximumFractionDigits: 2
})
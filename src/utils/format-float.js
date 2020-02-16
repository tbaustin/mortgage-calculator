export default (value) => Math.abs(+(value.toLocaleString(`en-US`, {
	minimumFractionDigits: 2,
	maximumFractionDigits: 2
}).replace(/[^\d.]/g, ``)))
// Mortgage Montly Payments

export default ({ p, i, loanLength }) => {
	const r = (i / 100) / 12
	const n = 12 * loanLength
	const numerator = r * (Math.pow(1 + r, n))
	const denominator = (Math.pow(1 + r, n) - 1)
	const monthlyPayment = p * numerator / denominator
	const totalPayment = monthlyPayment * 12 * loanLength
	return {
		monthlyPayment,
		totalPayment
	}
}
import formatFloat from './format-float'

export default (a, b) => {
	const loanDifference = formatFloat(a.loanLength - b.loanLength)
	const aTotal = a.monthlyPayment * 12 * loanDifference
	const bTotal = b.monthlyPayment * 12 * loanDifference
	return formatFloat(aTotal - bTotal)
}
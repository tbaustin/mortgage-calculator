export default (params) => {
	const { numYears, initialAmount, monthlyContribution, rate } = params
  const monthlyGainFactor = Math.pow(1 + (rate / 100), 1/12)
  return Array(12 * numYears)
    .fill()
    .reduce(acc => acc * monthlyGainFactor + monthlyContribution, initialAmount)
}
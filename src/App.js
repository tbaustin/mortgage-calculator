import React, { useReducer, useEffect } from 'react';

import mortgage from './utils/mortgage'
import compoundInterest from './utils/compound-interest'
import formatCurrency from './utils/format-currency'
import formatFloat from './utils/format-float'
import './App.css';

function App() {
	const objReducer = (state, action) => ({ ...state, ...action })
	const arrReducer = (state, action) => {
		if(Array.isArray(action)) return action
		return [ ...state, action ]
	}
	const [values, setValues] = useReducer(objReducer, {
		p: 206000,
		i: 3.99,
		loanLength: 15,
		compoundRate: 5.00,
	})
	const { monthlyPayment, totalPayment } = mortgage(values)
	const [totals, setAmount] = useReducer(objReducer, { monthlyPayment, totalPayment })
	const [compare, setCompare] = useReducer(arrReducer, [])

	useEffect(() => {
		const { monthlyPayment, totalPayment } = mortgage(values)
		setAmount({ monthlyPayment, totalPayment })
	}, [values])

	function addToCompare() {
		if(compare.length > 1) {
			alert(`You already have 2 compares, please remove one or both to add a new compare`)
			return
		}
		setCompare({
			total: formatFloat(totals.totalPayment),
			i: values.i,
			p: values.p,
			loanLength: values.loanLength,
			monthlyPayment: formatFloat(totals.monthlyPayment)
		})
	}

	const longerLoanInvestment = compare.length > 1 && compoundInterest({
		numYears: Math.max(...[compare[0].loanLength, compare[1].loanLength]),
		initialAmount: 0,
		monthlyContribution: formatFloat(compare[0].monthlyPayment - compare[1].monthlyPayment),
		rate: values.compoundRate
	})

	const shorterLoanInvestment = compare.length > 1 && compoundInterest({
		numYears: Math.min(...[compare[0].loanLength, compare[1].loanLength]),
		initialAmount: 0,
		monthlyContribution: Math.min(...[compare[0].monthlyPayment, compare[1].monthlyPayment]),
		rate: values.compoundRate
	})

  return (
    <div className="App">
      <header className="App-header">
				<div className="container">
					<section>
						<p>Money made with safe investment</p>
						<span>Compound Interest: </span>
						<input
							type="text"
							value={values.compoundRate}
							onChange={e => setValues({ compoundRate: e.target.value })}
						/>
					</section>
					{compare.length > 1 && (
						<section>
							<p>Total Investment for longer loan: {formatCurrency(longerLoanInvestment)}</p>
							<p>Total Investment for shorter loan: {formatCurrency(shorterLoanInvestment)}</p>
							<p>Total difference: {formatCurrency(longerLoanInvestment - shorterLoanInvestment)}</p>
						</section>
					)}
				</div>
				<div className={`container`}>
					<p>
						Mortgage Calculator
					</p>
					<section>
						<div>Monthly Payments: {formatCurrency(totals.monthlyPayment)}</div>
						<div>Total Payment: {formatCurrency(totals.totalPayment)}</div>
					</section>
					<section>
						<span>Principle: </span>
						<input
							type="text"
							value={values.p}
							onChange={e => setValues({ p: isNaN(e.target.value) ? 0 : +e.target.value })}
						/>
					</section>
					<section>
						<span>Interest: </span>
						<input
							type="text"
							value={values.i}
							onChange={e => setValues({ i: e.target.value })}
						/>
					</section>
					<section>
						<span>Loan Length: </span>
						<input
							type="text"
							value={values.loanLength}
							onChange={e => setValues({ loanLength: isNaN(e.target.value) ? 1 : +e.target.value })}
						/>
					</section>
					<button className="compareBtn" onClick={addToCompare}>
						Add Value to Compare
					</button>
				</div>
        <div className={`container`}>
					<section style={{
						display: `flex`,
						flexFlow: `row`
					}}>
						{compare.map((c, i) => (
							<div key={i} style={{
								margin: `0 15px`,
								border: `2px solid #fff`,
								padding: `20px`
							}}>
								<span
								style={{
									cursor: `pointer`
								}}
								onClick={() => {
									const index = compare.findIndex(v => v.total === c.total)
									const updatedCompare = [...compare.slice(0, index), ...compare.slice(index + 1)]
									setCompare(updatedCompare)
								}}>[ X ]</span>
								<p>Principle: {formatCurrency(c.p)}</p>
								<p>Interest: {c.i}</p>
								<p>Loan Length: {c.loanLength}</p>
								<p>Total Amount Spent: {formatCurrency(c.total)}</p>
								<p>Monthly Payment: {formatCurrency(c.monthlyPayment)}</p>
							</div>
						))}
					</section>
					{compare.length > 1 && <section>
						<h1>Compare</h1>
						<p>Total difference: {formatCurrency(compare[0].total - compare[1].total)}</p>
						<p>Monthly difference: {formatCurrency(compare[0].monthlyPayment - compare[1].monthlyPayment)}</p>
						<p>Loan Length difference: {formatFloat(compare[0].loanLength - compare[1].loanLength)}</p>
					</section>}
				</div>
      </header>
    </div>
  );
}

export default App;

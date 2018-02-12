//converts the object in to the array of object with x and y coordinates for a chart
export const ArrayforChart = (expenseCategory, budget, plaidArr, expensesSum) => {
  console.log('entered Array of')
  var plaid = []
  Object.keys(expenseCategory).map(key => {
    if (key !== 'created_at' && key !== 'updated_at' && key !== 'user_id' && key !== 'id') {
      if (Number(expenseCategory[key]) > 0)
        expensesSum += Number(expenseCategory[key])
      plaid.push({ name: key, budget: budget[key], expense: expenseCategory[key] })
    }
  })
  return plaid
}


//sums the total money spent on each category of the transactions object from the PLAID API
export const objectForChart = (transaction, expenseCategory) => {
   console.log('entered objectForChart of')
  let found = false, val
  transaction.map(obj => {
    if (obj.amount > 0) val = obj.amount
    else val = 0
    Object.keys(categories).map(keys => {
      if (obj.category) {
        if (categories[keys].indexOf(obj.category[0]) !== -1) {
          found = true
          if (expenseCategory[keys] === 0) {
            expenseCategory[keys] = val
          } else expenseCategory[keys] += val
        }
      }
    })
    if (!found) {
      {/*if the transaction category did not match any keys in the categories object, it is placed in other*/ }
      expenseCategory['other'] += val
    }
  })

  return expenseCategory
}


export const reducer = (obj) => {
  console.log('reducer')
  return Object.keys(obj).reduce((total, num) => {
    if (isNaN(obj[num]) === false) {
      total += Number(obj[num])
    }
    return total
  }, 0)
}
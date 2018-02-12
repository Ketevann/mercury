import axios from 'axios'
import { browserHistory } from 'react-router'
const PLAID_PUBLIC_KEY = require('../../newCredentials.js').PLAID_PUBLIC_KEY
import Promise from 'bluebird'
const initialPlaidState = {
	currentUser: {},
	accessToken: '',
	transactions: {}
}

// --------------------------- actions --------------------------
const GETACCESSTOKEN = 'GET_ACCESSTOKEN'
const GETTRANSAC = 'GET_TRANSACTIONS'
const CATEGORIES = 'CATEGORIES'

// ------------------------ action creator ----------------------
export const getAccessToken = accessToken => ({
	type: GETACCESSTOKEN, accessToken
})

export const getTransactions = transactions => ({
	type: GETTRANSAC, transactions
})

// ------------------------- dispatchers ------------------------
/*export const fetchAccessToken = (public_token) =>
	dispatch =>
		axios.post('/api/get_access_token', {public_token: public_token})
			.then(res => {
				dispatch(getAccessToken(res.data))
			})
			.catch(err => console.error('Fetching access token unsuccessful', err))*/

export const fetchAccessToken = (public_token) =>
	dispatch => {
		var user = axios.get('/api/auth/whoami')
		var accessToken = axios.post('/api/plaid/get_access_token', { public_token: public_token })

		Promise.all([user, accessToken]).spread((user, accessToken) => {
			return axios.post('/api/plaid/putTokenInDB',
				{
					user: user.data,
					accessToken: accessToken.data
				})
		})
			.then((accessToken) => {

			})
			.catch(err => console.error('Fetching access token unsuccessful', err))
	}

// export const connectPlaid = () =>
// 	dispatch => {
// 		Plaid.create({
// 			apiVersion: 'v2',
// 			clientName: 'Mercury',
// 			env: 'development',
// 			product: ['auth'],
// 			key: PLAID_PUBLIC_KEY,
// 			onSuccess: (public_token) => {
// 				dispatch(fetchAccessToken(public_token))
// 			},
// 			onExit: console.log
// 		}).open()
// 	}

export const fetchAccounts = (access_token) =>
	dispatch =>
		axios.get('/api/plaid/accounts')

			.catch(err => console.error('Fetching accounts unsuccessful', err))

export const fetchTransactions = (startDate, endDate) =>
	dispatch =>
		axios.post('/api/plaid/transactions', { startDate: startDate, endDate: endDate })
			.then(res => {
				dispatch(getTransactions(res.data))
			})
			.catch(err => console.error('Fetching transactions unsuccessful', err))


export const fetchItems = (access_token) =>
	dispatch =>
		axios.post('/api/plaid/item')

			.catch(err => console.error('Fetching items unsuccessful', err))

export const getCat = categories => ({
	type: CATEGORIES, categories
})

export const getCategories = () =>
dispatch =>
axios.get('/api/bla')
.then(res => {
  dispatch(getCat(res.data))
})
.catch(err => console.error('Fetching items unsuccessful', err))


// ------------------------------- reducers ---------------------------------
const reducer = (state = initialPlaidState, action) => {
	const newState = Object.assign({}, state)
	switch (action.type) {
		case GETACCESSTOKEN:
			return Object.assign({}, state, { accessToken: action.accessToken })
		case GETTRANSAC:
			return Object.assign({}, state, { transactions: action.transactions })
		case CATEGORIES:
			return Object.assign({}, state, { transactions: action.categories.cat })
		default:
			return state
	}
}

export default reducer

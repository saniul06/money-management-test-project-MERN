import * as Types from './types';
import Axios from 'axios'

export const loadTransactions = (history, location) => dispatch => {
    Axios.get('/api/transactions')
        .then(response => {
            dispatch({ type: Types.LOAD_TRANSACTIONS, payload: { transactions: response.data } })
        })
        .catch(err => {
            if (err.response.data.message === 'server error') {
                alert('server error')
            } else {
                localStorage.removeItem('auth-token')
                dispatch({
                    type: Types.SET_USER, payload: {
                        user: {}
                    }
                })
                history.push({ pathname: "/login", state: { from: location } })
                // history.push('/login')
            }
        })
}

export const createTransaction = (body, history, location) => dispatch => {
    Axios.post('/api/transactions', body)
        .then(response => {
            dispatch({ type: Types.CREATE_TRANSACTION, payload: response.data.transaction })
        })
        .catch(err => {
            if (err.response.data.message === 'server error' || err.response.data.message === 'database error') {
                alert('server error')
            } else {
                localStorage.removeItem('auth-token')
                dispatch({
                    type: Types.SET_USER, payload: {
                        user: {}
                    }
                })
                history.push({ pathname: "/login", state: { from: location } })
            }
        })
}

export const updateTransaction = (body, history, location) => dispatch => {
    const id = body._id
    Axios.put(`/api/transactions/${id}`, body)
        .then(response => {
            dispatch({ type: Types.UPDATE_TRANSACTION, payload: { transaction: response.data.transaction } })
        })
        .catch(err => {
            alert('err')
            if (err.response.data.message === 'server error') {
            } else {
                localStorage.removeItem('auth-token')
                dispatch({
                    type: Types.SET_USER, payload: {
                        user: {}
                    }
                })
                history.push({ pathname: "/login", state: { from: location } })
            }
        })
}

export const removeTransaction = (id, history, location) => dispatch => {
    Axios.delete(`/api/transactions/${id}`)
        .then(response => {
            dispatch({ type: Types.DETELE_TRANSACTION, payload: { transaction: response.data.transaction } })
        })
        .catch(err => {
            if (err.response.data.message === 'server error') {
                alert('server error')
            } else {
                localStorage.removeItem('auth-token')
                dispatch({
                    type: Types.SET_USER, payload: {
                        user: {}
                    }
                })
                history.push({ pathname: "/login", state: { from: location } })
            }
        })
}
import * as Types from './types'
import Axios from 'axios'
import jwtDecode from 'jwt-decode'
import setAuthHeader from '../../utils/setAuthHeader'

export const register = (user, history) => dispatch => {
    Axios.post('/api/users/register', user)
        .then(res => {
            dispatch({ type: Types.USERS_ERROR, payload: { error: {} } })
            history.push('/login')
        })
        .catch(err => {
            dispatch({
                type: Types.USERS_ERROR, payload: {
                    error: err.response.data
                }
            })
        })
}

export const login = (user, history, location) => dispatch =>
    Axios.post('/api/users/login', user)
        .then(res => {
            const token = res.data.token
            localStorage.setItem('auth-token', token)
            setAuthHeader(token)
            let decode = jwtDecode(res.data.token)
            dispatch({ type: Types.SET_USER, payload: { user: decode } })
            if (location.state) {
                history.push(location.state.from.pathname)
            } else {
                history.push('/')
            }
            // history.push('/')
        })
        .catch(err => {
            dispatch({
                type: Types.USERS_ERROR, payload: {
                    error: err.response.data
                }
            })
        })

export const logout = (history) => {
    localStorage.removeItem('auth-token')
    history.push('/login')
    return {
        type: Types.SET_USER, payload: {
            user: {}
        }
    }
}


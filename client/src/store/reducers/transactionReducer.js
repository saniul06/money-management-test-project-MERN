import * as Types from '../actions/types'

const transactionReducer = (state = [], action) => {
    switch (action.type) {
        case Types.LOAD_TRANSACTIONS: {
            return action.payload.transactions
        }

        case Types.CREATE_TRANSACTION: {
            let tran = [...state]
            tran.unshift(action.payload)
            return tran
        }

        case Types.UPDATE_TRANSACTION: {
            let { transaction } = action.payload;
            return state.map(item => {
                if (item._id === transaction._id) {
                    return transaction
                }
                return item;
            })
        }


        case Types.DETELE_TRANSACTION:
            return state.filter(item => (
                item._id !== action.payload.transaction._id
            ))

        default: return state;
    }
}

export default transactionReducer
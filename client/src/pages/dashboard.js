import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadTransactions, removeTransaction } from '../store/actions/transactionAction'
import Create from '../components/transaction/create'
import { Link } from 'react-router-dom'
import login from './login'

export class dashboard extends Component {


    state = {
        search: '',
        open: false,
        selectedTransaction: {
            amount: '',
            type: 'expense',
            note: ''
        }
    }

    openModal = () => {
        this.setState({ open: true, selectedTransaction: { amount: '', type: 'expense', note: '' } })
    }

    openModalForUpdate = () => {
        this.setState({ open: true })
    }

    closeModal = () => {
        this.setState({ open: false })
    }

    handleSearch = e => {
        this.setState({
            search: e.target.value
        })
    }

    select = id => {
        const singleTransaction = this.props.transactions.find(item => item._id === id)
        this.setState({
            selectedTransaction: singleTransaction
        })
        this.openModalForUpdate()
    }

    delete = id => {
        console.log('i am clicked')
        this.props.removeTransaction(id, this.props.history, this.props.location)
    }

    componentDidMount() {
        this.props.loadTransactions(this.props.history, this.props.location)
    }

    render() {
        const { auth, transactions } = this.props;
        let filteredTransaction = transactions.length > 0 ? transactions.filter(tran => tran.type.includes(this.state.search)) : []
        return (
            <div>
                <div className="row">
                    <div className="col-md-8 offset-md-3">
                        <Link to='/login'>Login</Link>
                        <Link to='/dashboard'>dashboard</Link>
                        <input type="text" onChange={this.handleSearch} className="form-control" value={this.state.search} placeholder='search here' />
                        <Create open={this.state.open} close={this.closeModal} history={this.props.history} location={this.props.location} selectedTransaction={this.state.selectedTransaction} />
                        <button onClick={this.openModal} className="btn btn-primary">Create transaction</button>
                        <h2>Your name is : {auth.user.name}</h2>
                        <p>Your email is: {auth.user.email}</p>
                        <hr />
                        <h1>Transactions</h1>
                        <ul className="list-group">
                            {
                                filteredTransaction.map(tran => (
                                    <li key={tran._id} className="list-group-item">
                                        <p>Type: {tran.type}</p>
                                        <p>Amount: {tran.amount}</p>
                                        <p>Type: {tran.note}</p>
                                        <button onClick={() => this.select(tran._id)} className="btn btn-warning mr-2">Update</button>
                                        <button onClick={() => this.delete(tran._id)} className="btn btn-danger">Delete</button>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    transactions: state.transactions
})

export default connect(mapStateToProps, { loadTransactions, removeTransaction })(dashboard)

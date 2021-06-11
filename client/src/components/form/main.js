import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createTransaction, updateTransaction } from '../../store/actions/transactionAction'

export class main extends Component {
    state = {
        amount: '',
        type: 'expense',
        note: '',
        isUpdate: false
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        const { amount, type, note } = this.state
        if (this.state.isUpdate) {
            const _id = this.props.selectedTransaction._id;
            this.props.updateTransaction({ _id, amount, type, note }, this.props.history, this.props.location)
            this.props.close()
        } else {
            this.props.createTransaction(this.state, this.props.history, this.props.location)
            this.props.close()
        }

    }

    componentDidMount() {
        if (this.props.selectedTransaction.amount !== '') {
            this.setState({
                amount: this.props.selectedTransaction.amount,
                type: this.props.selectedTransaction.type,
                note: this.props.selectedTransaction.note,
                isUpdate: true
            })
        } else {
            this.setState({ isUpdate: false })
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="amount"></label>
                        <input type="number" name="amount" id="amount" className="form-control" placeholder="enter amount" aria-describedby="helpId" onChange={this.handleChange} value={this.state.amount} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="type">
                            <select onChange={this.handleChange} className="form-control" name="type" id="type" value={this.state.type}>
                                <option disabled>Select Type</option>
                                <option value='expense' >expense</option>
                                <option value='income'>income</option>
                            </select>
                        </label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="note">Write a note</label>
                        <textarea onChange={this.handleChange} value={this.state.note} className="form-control" name="note" id="note" rows="3"></textarea>
                    </div>
                    <button className="btn btn-primary">{this.state.isUpdate ? 'Update' : 'Create'}</button>
                </form>
            </div>
        )
    }
}

export default connect(null, { createTransaction, updateTransaction })(main)

import React, { Component } from 'react'
import Modal from 'react-modal';
import Form from '../form/main'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

export class create extends Component {
    render() {
        return (
            <Modal
                isOpen={this.props.open} ariaHideApp={false}
                onRequestClose={this.props.close}
                style={customStyles}
                contentLabel="Create transaction"
            >
                <button onClick={this.props.close}>close</button>
                <Form selectedTransaction={this.props.selectedTransaction} history={this.props.history} location={this.props.location} close={this.props.close} />
            </Modal>
        )
    }
}

export default create

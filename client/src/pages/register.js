import { Component } from 'react';
import { Link } from 'react-router-dom'
import Input from '../components/form/Input';
import { connect } from 'react-redux'
import { register } from '../store/actions/authActions'

const init = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    error: {}
}

class Register extends Component {
    state = init;

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = (e) => {
        console.log(this.props)
        e.preventDefault();
        const { name, email, password, confirmPassword } = this.state;
        this.props.register({ name, email, password, confirmPassword }, this.props.history)

    };

    static getDerivedStateFromProps(props, state) {
        if (JSON.stringify(props.auth.error) !== JSON.stringify(state.error)) {
            return {
                error: props.auth.error
            }
        }
        return null
    }

    render() {
        const { name, email, password, confirmPassword, error } = this.state;
        return (
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4 className="text-center">Register here</h4>
                    <form onSubmit={this.handleSubmit}>
                        <Input
                            label='Name'
                            type="text"
                            name="name"
                            value={name}
                            placeholder="Enter your name"
                            handleChange={this.handleChange}
                            error={error.name}
                        />
                        <Input
                            label='Email'
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Enter your email"
                            handleChange={this.handleChange}
                            error={error.email}
                        />
                        <Input
                            label='Password'
                            type="password"
                            name="password"
                            value={password}
                            placeholder="Enter your password"
                            handleChange={this.handleChange}
                            error={error.password}
                        />
                        <Input
                            label='Confirm password'
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            placeholder="confirm password"
                            handleChange={this.handleChange}
                            error={error.confirmPassword}
                        />
                        <Link to='/login'>Already have an account? Sing in here</Link>
                        <button className="btn btn-primary d-block mt-2">Register</button>
                    </form>
                </div>
            </div >
        );
    }
}

const mstp = state => ({
    auth: state.auth
})

export default connect(mstp, { register })(Register);

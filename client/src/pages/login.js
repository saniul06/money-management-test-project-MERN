import { Component } from 'react';
import { Link } from 'react-router-dom'
import Input from '../components/form/Input';
import { connect } from 'react-redux'
import { login } from '../store/actions/authActions'

const init = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    error: {}
}

class Login extends Component {
    state = init

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = this.state;
        this.props.login({ email, password }, this.props.history, this.props.location)
    };

    static getDerivedStateFromProps(props, state) {
        if (JSON.stringify(props.log.error) !== JSON.stringify(state.error)) {
            // const obj = { amount: '', type: 'expense', note: '' }
            return {
                error: props.log.error
            }
        }
        return null
    }

    render() {
        const { email, password, error } = this.state;
        return (
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <Link to='/dashboard'>Dashboard</Link>
                    <h4 className="text-center">Login here</h4>
                    <form onSubmit={this.handleSubmit}>
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
                        <Link to='/register'>Don't have an account? register here</Link>
                        <button className="btn btn-primary d-block mt-2">Login</button>
                    </form>
                </div>
            </div >
        );
    }
}

const mstp = state => ({
    log: state.auth
})

export default connect(mstp, { login })(Login);


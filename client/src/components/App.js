import { Component } from 'react'
import '../App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import home from '../pages/home'
import login from '../pages/login';
import register from '../pages/register'
import dashboard from '../pages/dashboard'
import PrivateRoute from './private/private'
import Navigation from './navigation'
import PrivateLogin from './private/loginPrivate'

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div className="container">
					<Navigation />
					<Switch>
						<Route path='/' exact component={home} />
						<PrivateLogin path='/login' component={login} />
						{/* <Route path='/login' component={login} /> */}
						<Route path='/register' component={register} />
						{/* <Route path='/dashboard' component={dashboard} /> */}
						<PrivateRoute path="/dashboard" component={dashboard} />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;

import { connect } from 'react-redux';
import { Route, Redirect } from "react-router-dom";

const loginPrivate = ({ component: Com, auth, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
            console.log('i am in private login'); console.log(props)
            return !auth.isAuthenticated ? (
                <Com {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: '/'
                    }}
                />
            )
        }
        }
    />
);

const mapStateToProps = state => (
    { auth: state.auth }
)
export default connect(mapStateToProps)(loginPrivate);

import { connect } from 'react-redux';
import { Route, Redirect } from "react-router-dom";

const Private = ({ component: Com, auth, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            auth.isAuthenticated ? (
                <Com {...props} />
            ) : (
                <Redirect
                    to={{ pathname: "/login", state: { from: props.location } }}
                />
            )
        }
    />
);

const mapStateToProps = state => (
    { auth: state.auth }
)
export default connect(mapStateToProps)(Private);

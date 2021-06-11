import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store/actions/authActions'

const home = (props) => (
    <div>
        i am home
        {props.store.isAuthenticated ? (
            <button onClick={() => props.logout(props.history)} className="btn btn-danger">Logout</button>
        ) : (
            <Link to="/login">
                <button className="btn btn-success">Sing in</button>
            </Link>
        )}
        <Link to='/dashboard'><button className="btn btn-secondary">Dashboard</button></Link>
    </div>
);

const dstp = (state) => ({
    store: state.auth
});

export default connect(dstp, { logout })(home);

// const home = (props) => {
//     return (
//         <div>
//             <h1>home route</h1>
//         </div>
//     )
// }

// export default home

import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/loader/Loader";
import { Link } from "react-router-dom";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { useLazyGetUserDetailsQuery } from "../../features/user/userApiSlice";
import { setCredentials, setError } from "../../features/user/userSlice"

const Profile = ({ history }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user,loading} = useSelector(state => state.user);
  const [getUserDetails] = useLazyGetUserDetailsQuery();

  useEffect(() => {
    (async () => {

      try {
        const userData = await getUserDetails().unwrap();
        if (userData.success) {
          dispatch(setCredentials({user: userData.data}))
        }
      } catch (error) {
        dispatch(setError(error.error))
      }

    })()
  }, [navigate,dispatch,getUserDetails]);



  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user.name}'s Profile`} />
          <div className="profileContainer">
            <div>
              {/* <h1>My Profile</h1> */}
              <img src={user.avatar.url} alt={user.name} />
              <Link to="/profile/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user.createdAt).substring(0, 10)}</p>
              </div>

              <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;

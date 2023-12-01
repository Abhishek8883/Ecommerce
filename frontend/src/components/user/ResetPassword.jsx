import React, { Fragment, useState, useEffect } from "react";
import "./ResetPassword.css";
// import Loader from "../layout/loader/Loader";
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { useResetPasswordMutation } from "../../features/user/userApiSlice";
import {useNavigate} from "react-router-dom"

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [resetPassword] = useResetPasswordMutation();
  const alert = useAlert();

  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = async (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.append("oldPassword", oldPassword)
    myForm.append("newPassword", password);
    myForm.append("confirmPassword", confirmPassword);

    if ((password && confirmPassword && oldPassword) && password === confirmPassword) {
      try {
        const data = await resetPassword(myForm).unwrap();
        if(data.success){
          navigate("/profile")
        }

      } catch (error) {
        alert.error(error.data)
      }
    }
  };

  useEffect(() => {
    // if (error) {
    //   alert.error(error);
    //   dispatch(clearErrors());
    // }

    // if (success) {
    //   // alert.success("Password Updated Successfully");

    //   // history.push("/login");
    // }
  }, [dispatch]);

  return (
    <Fragment>
      (
      <Fragment>
        <MetaData title="Change Password" />
        <div className="resetPasswordContainer">
          <div className="resetPasswordBox">
            <h2 className="resetPasswordHeading">Update Profile</h2>

            <form
              className="resetPasswordForm"
              onSubmit={resetPasswordSubmit}
            >
              <div>
              <VpnKeyIcon />
                <input
                  type="password"
                  placeholder="Old Password"
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <div>
                <LockOpenIcon />
                <input
                  type="password"
                  placeholder="New Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="loginPassword">
                <LockIcon />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <input
                type="submit"
                value="Update"
                className="resetPasswordBtn"
              />
            </form>
          </div>
        </div>
      </Fragment>
      )
    </Fragment>
  );
};

export default ResetPassword;

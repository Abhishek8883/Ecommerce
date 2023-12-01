import React, { Fragment, useState, useEffect } from "react";
import "./UpdateProfile.css";
// import Loader from "../layout/loader/Loader";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
// import MenuIcon from '@mui/icons-material/Menu';
import FaceIcon from "@mui/icons-material/Face";
import { useDispatch, useSelector } from "react-redux";
// import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { useUpdateProfileMutation } from "../../features/user/userApiSlice";
import {useNavigate} from "react-router-dom"
import { useAlert } from "react-alert";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const [updateProfile,{isLoading,data,error}] = useUpdateProfileMutation();
  const { user } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const updateProfileSubmit = (e) => {

    
    e.preventDefault();

    const myForm = new FormData();  
    myForm.append("name", name);
    myForm.append("email", email);
    myForm.append("avatar", avatar);
    updateProfile(myForm);
    if(!isLoading){
      alert.success(data.message)
      navigate("/profile")
    }
    if(error && error.data){
      alert.error(error.data.messege)
    }
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }

    // if (error) {
    //   alert.error(error);
    //   dispatch(clearErrors());
    // }

    // if (isUpdated) {
    //   alert.success("Profile Updated Successfully");
    //   dispatch(loadUser());

    //   history.push("/account");

    //   dispatch({
    //     type: UPDATE_PROFILE_RESET,
    //   });
    // }
  }, [dispatch,user]);
  return (
    <Fragment>
      {/* {loading ? (
        <Loader />
      ) : ( */}
        <Fragment>
          <MetaData title="Update Profile" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>

              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="updateProfileEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      {/* )} */}
    </Fragment>
  );
};

export default UpdateProfile;
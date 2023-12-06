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
import { useNavigate } from "react-router-dom"
import { useAlert } from "react-alert";
import Loader from "../layout/loader/Loader";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const { user, loading } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const updateProfileSubmit = async (e) => {
    e.preventDefault();

    try {
      const myForm = new FormData();
      myForm.append("name", name);
      myForm.append("email", email);
      myForm.append("avatar", avatar);

      const result = await updateProfile(myForm).unwrap();

      if (result.success) {
        alert.success(result.message)
        navigate("/profile")
      }
    } catch (error) {
      let err = JSON.parse(JSON.stringify(error));
      alert.error(err.data.message);
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


  }, [dispatch, user]);
  return (
    <Fragment>
      {loading || isLoading ? (
        <Loader />
      ) : (
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
                {isLoading ? <input
                  type="submit"
                  value="Updating"
                  className="updateProfileBtnDisabled"
                  disabled="true"
                />
                  :
                  <input
                    type="submit"
                    value="Update"
                    className="updateProfileBtn"
                  />}
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdateProfile;

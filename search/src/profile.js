import React from "react";



const Profile = ({
  dp,
  username,
  name,
  location,
  bio,
  followersCount,
  followedCount,
  star,
  repoCount,
}) => {
  return (
    <React.Fragment>
      <div className="profile-card adjust-profile">
        <div className="image-cropper ic">
          {" "}
          <img
            src={dp}
            className="profile-pic"
            alt="User Profile"
          />{" "}
        </div>
        <div className="bio">
          <h1> {username} </h1>
          <h2> <code>{name}</code> </h2>

          <h3> <i>{bio}</i> </h3>
          <h3 id="location"> <span className="im im-location"></span> {location != null && `Lives at ${location}`} {location === null && `Location not specified`} </h3>
          <h3><span className="im im-users"></span> {followersCount} Followers</h3>
          <h3><span className="im im-user-male"></span> {followedCount} Following</h3>
          <h3><span className="im im-book"></span> {repoCount} Repositories</h3>
          <h3><span className="im im-star"></span> {star !== 100 && `${star} Stars`} {star === 100 && "100+ Stars"} </h3>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Profile;

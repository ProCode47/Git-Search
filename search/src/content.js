import React, { useState } from "react";
import Followers from "./followers";
import Profile from "./profile";
import Repo from "./repo";
import axios from "axios";

const Content = () => {
  // All Declared States

  const [searchItem, setSearch] = useState("");
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [location, setLocation] = useState("");
  const [followersCount, setFollowersCount] = useState("");
  const [followedCount, setFollowedCount] = useState("");
  const [bio, setBio] = useState("");
  const [dp, setDp] = useState({});
  const [repoCount, setRepoCount] = useState("");
  const [repositories,setRepositories] = useState([]);
  const [following, setFollowing] = useState([]);
  const [stars, setStar] = useState("");
  const [showErr, setErr] = useState(false);
  const [showInfo, setInfo] = useState(false);
  const [showHome, setHome] = useState(true);
  // Search Functions

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const closeAlert = () => {
    setErr(false);
  };

  const submitSearch = () => {
    // Get Request for User Data
    axios
      .get(`https://api.github.com/users/${searchItem}`)
      .then((res) => {
        const gitData = res.data;
        setDp(gitData.avatar_url)
        setLogin(gitData.login);
        setName(gitData.name);
        setLocation(gitData.location);
        setBio(gitData.bio);
        setFollowedCount(gitData.following);
        setFollowersCount(gitData.followers);
        setRepoCount(gitData.public_repos);
        setHome(false);
        setInfo(true)
        setErr(false)
      })
      .catch((err) => {
        console.log(err);
        setErr(true);
      });
   // Get Request for Repositories
    axios
      .get(`https://api.github.com/users/${searchItem}/repos?per_page=10`)
      .then((res) => {
        const repose = []
        const repoData = res.data;
        repoData.forEach((repo) => {
          repose.push({name:repo.name,link:repo.html_url});
        });
        setRepositories(repose)
      })
      .catch((err) => {
        console.log(err);
      });
   // Get Request for Following
    axios
      .get(`https://api.github.com/users/${searchItem}/following?per_page=15`)
      .then((res) => {
        const followed = [];
        const followData = res.data;
        followData.forEach((follow) => {
          followed.push({name: follow.login, link:follow.html_url, dp:follow.avatar_url});
        });
        setFollowing(followed)
 
      })
      .catch((err) => {
        console.log(err);
      });
    //  Get Request for Stars
    axios
      .get(`https://api.github.com/users/${searchItem}/starred?per_page=100`)
      .then((res) => {
        const starData = res.data;
        const star = starData.length
        setStar(star)
      })
      .catch((err) => {
        console.log(err);
      });
  };



  return (
    <React.Fragment>
      <header>
        {" "}
        <h1> Github Search </h1>
      </header>
      <br />
      <br />
      <div className="search-bar">
        {" "}
        <span>
          {" "}
          <input
            type="text"
            placeholder="Search Github"
            name="search"
            onChange={handleSearch}
            value={searchItem}
            required
          />{" "}
          <button className="search-btn" onClick={submitSearch}>
            {" "}
            Search{" "}
          </button>{" "}
        </span>{" "}
        { showErr && <div className="alert alert-danger">
          <strong> User not found </strong> Check spelling and Try again
          <a className="close" onClick={closeAlert}>
                &times;
              </a>
</div>}
      </div>
       {/* Set Default Elements to be shown before search */}
      { showHome && <div className="homepage">
        <h1> Welcome to Git Search</h1>
        <h2> Enter the username of an autheticated Github User and explore related information</h2>
        <h2> Click on each <code>Repository</code> or <code>Followed User</code> to check out more </h2>
      </div>}
      
      {/*  Set Condition for Info Display using ShowInfo State */}
     { showInfo && <div className="container flex-col">
        <Repo repos={repositories} />
        <Profile
          dp={dp}
          username={login}
          name={name}
          location={location}
          bio={bio}
          followersCount={followersCount}
          followedCount={followedCount}
          repoCount={repoCount}
          star={Number(stars)}
        />
        <Followers followings={following}/>
      </div>}
      <div class="center" id="credit"><a href="https://github.com/ProCode47"> Developed with <span class="im im-heart"></span> by VC10</a></div>
    </React.Fragment>
  );
};

export default Content;

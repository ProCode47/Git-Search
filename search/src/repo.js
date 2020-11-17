import React from "react";


const Repo = ({repos}) => {
  return (
    <React.Fragment>
      <div className="repo adjust-repo">
        <ul>
          <li>
            <span className="im im-bookmark"></span> Repositories{" "}
          </li>
          {repos.map((repo) => (
             <a href={repo.link}> <li>{repo.name}</li> </a>
          ))}
                  
        </ul>
      </div>
    </React.Fragment>
  );
};
export default Repo;

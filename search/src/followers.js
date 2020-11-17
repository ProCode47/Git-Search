import React from 'react';

const Followers = ({followings}) => {
    return (
        <React.Fragment>
        <div className="followers ">
            <ul>
            <li><span className="im im-user-circle"></span> Following </li>
                    {followings.map((follow) => (
                        <a href={follow.link}> <li> <img src={follow.dp} className="follow-img" alt="Following"/><small id="follow-name"> {follow.name}</small> </li> </a>
                    ))}
            </ul>
    
        </div>
            </React.Fragment>

    )
}
export default Followers;
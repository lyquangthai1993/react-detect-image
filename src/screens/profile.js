import React, { useContext } from 'react';
import AuthContext from '../auth/authContext';


const Profile = () => {

  const authContext = useContext(AuthContext);

  

  const RenderProfile = (props) => {
    return (
      <div>
        <h1>Id token for: {props.profile.nickname}</h1>
        <br/>
        {JSON.stringify(props.profile)}
        <br/>
      </div>
    );
  };


  return (
    <div>
      <RenderProfile profile={authContext.authObj.userProfile}/>
      <button onClick={() => authContext.authObj.logout()}>Logout</button>
    </div>
  );
};


export default (Profile);

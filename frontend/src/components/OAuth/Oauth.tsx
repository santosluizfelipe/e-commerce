import React from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

const clientId = 'YOUR_GOOGLE_CLIENT_ID';

const Oauth: React.FC = () => {
  const onSuccess = (response: any) => {
    console.log('OAuth successful:', response);
    // Store the access token securely (e.g., in local storage or state)
  };

  const onFailure = (error: any) => {
    console.error('OAuth failed:', error);
  };

  const logout = () => {
    console.log('User logged out');
    // Clear the access token from storage
  };

  return (
    <div>
      <h2>OAuth Example</h2>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
      />
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={logout}
      />
    </div>
  );
};

export default Oauth;

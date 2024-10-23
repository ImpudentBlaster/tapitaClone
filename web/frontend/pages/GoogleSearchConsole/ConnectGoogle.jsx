import './pagename.css';
import React, { useState } from "react";
import { Card, Page, Layout, TextContainer, Text, Button } from "@shopify/polaris";
import { GoogleOAuthProvider, GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import google from './Google-Symbol.png';

const ConnectGoogle = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // Function to handle Google Login Success
  const handleLoginSuccess = (response) => {
    setUser(response);
    setError(null);
  };

  // Function to handle Google Login Failure
  const handleLoginFailure = (error) => {
    console.error("Google Login Failed:", error);
    setError("Failed to connect Google account.");
  };


  return (
    <GoogleOAuthProvider clientId="AIzaSyCWDI2vWXSC7KQGeODkgoz8EvS7BMp0OUE">
      <Page>
        <Layout>
          <Layout.Section>
            <div className="connect-googl_top">
              <Card title="Connect your Google account" sectioned>
                <div className="googl-inner-box">
                  <img src={google} alt="Google" width="70" height="40" />
                  <div style={{ width: "60%", marginLeft: "-200px" }}>
                    {user ? (
                      // <Text>{user.profileObj.name} connected</Text>
                      <p style={{ marginLeft: "50px" }}>{user.profileObj.name} connected</p>

                    ) : (
                      <p style={{ marginLeft: "50px" }}>No account connected</p>
                    )}
                  </div>

                  {!user ? (

                    <GoogleLogin
                      onSuccess={handleLoginSuccess}
                      onError={handleLoginFailure}
                      render={(renderProps) => (
                        <button
                          onClick={renderProps.onClick}
                          disabled={renderProps.disabled}
                          className="connect-googl-btn"
                        >
                          Connect
                        </button>
                      )}
                    />

                    // <button className="connect-googl-btn" >
                    //   Connect
                    // </button>



                  ) : (
                    <p style={{ marginLeft: "30px" }}>No account connected</p>
                    // <Text>Account connected</Text>
                  )}
                </div>
                <Text>Tapita uses this account to manage Google Search Console.</Text>
                {error && <Text color="critical">{error}</Text>}
              </Card>
            </div>
          </Layout.Section>
        </Layout>
      </Page >
    </GoogleOAuthProvider >
  );
}

export default ConnectGoogle;
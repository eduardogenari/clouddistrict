import './App.css';
import { GoogleLogin } from 'react-google-login'
import { useState } from 'react'
import { gapi } from 'gapi-script'
import Dashboard from './Dashboard'

const clientId = "510212601300-5j9gitb8imhu84j7rssbnide6d479luh.apps.googleusercontent.com"

export default function App() {

  const [user, setUser]=useState(null)

  const responseGoogle=(res)=>{
    setUser(res.profileObj.name)
  }

  const login = (
    <div className="login-container">
      <div className="login-header">
        <h1>welcome to the cloud district react test</h1>
        <h3>by eduardo genari</h3>
      </div>
      <div className="login-body">
        <div className="login-info">
          <p>Login to play with the dashboard. Create, read, update and delete users from the list.</p>
          <GoogleLogin
            clientId={clientId}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
            render={renderProps => (
              <button 
                onClick={renderProps.onClick} 
                disabled={renderProps.disabled} 
                className="btn-google"
                >login with google
              </button>
            )}
          />
        </div>
      </div>
    </div>
  )

  return (
    <div className='app-container'>
      {!user ? login : <Dashboard user={user} />}
    </div>
  );
}
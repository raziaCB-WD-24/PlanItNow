import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginPage = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    console.log(isAuthenticated);
    return (
        // !isAuthenticated && (
            <div>
                {/* sign in 
                <h1>sign in 
                </h1> */}
                <h2>sign in </h2>
            <button onClick= {() => loginWithRedirect()}>
                Sign In 
            </button>
            </div>
        
    )
        }



export default LoginPage;

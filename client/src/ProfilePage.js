// import React from 'react';
// import LoginPage from "./LoginPage";
// import LogOut from './LogOut';

// const ProfilePage = () => {
//     return (
//         <main>
//             <h1> Login </h1>
//             <LoginPage />
//             <LogOut />
//         </main>

//     );
// }
// export default ProfilePage;


import React from 'react';
import LoginPage from "./LoginPage";
import LogOut from './LogOut';
import { useAuth0 } from '@auth0/auth0-react';

const ProfilePage = () => {
    const { user, isAuthenticated } = useAuth0();
console.log(isAuthenticated);
    if (!isAuthenticated) {
        console.log("hello");
        return <LoginPage />;
    }
else 
    return (
        <main>
            <div>
                <h1>details</h1>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Picture: <img src={user.picture} alt={user.name} /></p>
            </div>
            <LogOut />
        </main>
    );
}

export default ProfilePage;

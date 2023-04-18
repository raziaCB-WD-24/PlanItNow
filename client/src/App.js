import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Navbar';
import HomePage from './HomePage';
import CalendarPage from './CalendarPage';
import TasksPage from './TasksPage';
import AppointmentsPage from './AppointmentsPage';
import ProfilePage from './ProfilePage';
// import LoginPage from './LoginPage';
// import LogOut from './LogOut';
// import { Auth0Provider } from '@auth0/auth0-react';
import styled from 'styled-components';

const App = () => {
  // const domain = "dev-nm7meq1s3tyqkem3.us.auth0.com";
  // const clientId = "zWbdNYWp0MXUB9zzkXCC3BCDO4Knrwx8";

  

  return (

    <BrowserRouter>
        <Navbar />
        <StyledApp>
    <Routes>
    <Route path='/' element={<HomePage />}/>
    <Route path="/CalendarPage" element={<CalendarPage />}/>
    <Route path="/TasksPage" element={<TasksPage />}/>
    <Route path="/AppointmentsPage" element={<AppointmentsPage />}/>
    <Route path="/ProfilePage" element={<ProfilePage />}/>

    </Routes>
    </StyledApp>
    </BrowserRouter>
    // </Auth0Provider>
  );
}



export default App;


const StyledApp = styled.div`
  background-color: #F3D6E4;
`;
// const App = () => {
//   console.log("hello");
//   return (
//     <main>
//       <h1>Autho Login</h1>
//       <LoginPage/>
//       <LogOut />
//     </main>

//   );
// }

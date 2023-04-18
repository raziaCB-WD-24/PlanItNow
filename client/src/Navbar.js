

import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";



const Navbar = () => {
    return (
        <NavbarContainer>
            <NavbarList>
                <NavbarItem>
                    <NavbarLink exact to="/" activeclassname="active">
                        Home
                    </NavbarLink>
                </NavbarItem>
                <NavbarItem>
                    <NavbarLink to="/CalendarPage" activeclassname="active">
                        Calendar
                    </NavbarLink>
                </NavbarItem>
                <NavbarItem>
                    <NavbarLink to="/AppointmentsPage" activeclassname="active">
                        Appointments
                    </NavbarLink>
                </NavbarItem>
                <NavbarItem>
                    <NavbarLink to="/TasksPage" activeclassname="active">
                        Tasks
                    </NavbarLink>
                </NavbarItem>
                <NavbarItem>
                    <NavbarLink to="/ProfilePage" activeclassname="active">
                        Profile
                    </NavbarLink>
                </NavbarItem>
            </NavbarList>
        </NavbarContainer>
    );
};

export default Navbar;
const NavbarContainer = styled.div`
display: flex;
position: fixed;
top: 0;
left: 0;
right: 0;
height: 60px;
margin: 0;
padding: 0 20px;
background-color: #333;
align-items: center;

`;

const NavbarList = styled.ul`
display: flex;
flex-direction: row;
margin: 0;
padding: 0;
list-style: none;

`;

const NavbarItem = styled.li`

margin-right: 20px;

&:last-child {
    margin-right: 0;
}

`;

const NavbarLink = styled(Link)`
display: block;
padding: 10px;
color: #fff;
text-decoration: none;
transition: all 0.3s ease;

&:hover {
    background-color: #555;
}

&.active {
    background-color: #fff;
    color: #333;
}
`;
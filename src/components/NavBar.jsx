import React from "react";
import { Navbar } from "react-bootstrap";

const NavBar = () => {

    return (
        <Navbar bg="dark">
            <Navbar.Brand >
                <img
                    src="./test-logo.svg"
                />
                BlogSN
            </Navbar.Brand>
        </Navbar>
    );
}

export default NavBar;
import React, { Component, useState, useContext } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import { AuthContext } from "../untils/auth";
function MenuBar() {
    //   state = { activeItem: 'home' }
    const {user ,logout} = useContext(AuthContext)
    const [activeItem, setActiveItem] = useState('home')
    const pathname = window.location.pathname;
    // login
    console.log(pathname);
    const path = pathname === '/' ? 'home' : pathname.substr(1);

    const handleItemClick = (e, { name }) => setActiveItem(name);
    const menuBar = user ? (
        <div>
            <Menu pointing secondary size="massive" color="teal">
                <Menu.Item
                    name= {user.username}
                    active
                    as={Link}
                    to="/"
                />

                <Menu.Menu position='right'>

                    <Menu.Item
                        name='logout'
                        onClick ={() => logout()}
                        as={Link}
                        to="/"
                    />
                </Menu.Menu>
            </Menu>
        </div>
    ) : (
        <div>
        <Menu pointing secondary size="massive" color="teal">
            <Menu.Item
                name='home'
                active={activeItem === 'home'}
                onClick={handleItemClick}
                as={Link}
                to="/"
            />

            <Menu.Menu position='right'>
                <Menu.Item
                    name='login'
                    active={activeItem === 'login'}
                    onClick={handleItemClick}
                    as={Link}
                    to="/login"
                />
                <Menu.Item
                    name='register'
                    active={activeItem === 'register'}
                    onClick={handleItemClick}
                    as={Link}
                    to="/register"
                />
            </Menu.Menu>
        </Menu>
    </div>
    )
    return menuBar
}
export default MenuBar;
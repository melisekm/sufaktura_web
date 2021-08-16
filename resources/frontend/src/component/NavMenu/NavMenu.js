import React from 'react';
import NavBar from "./NavBar";
import NavMenuItem from "./NavMenuItem";

const NavMenu = () => {
    return (
        <div>
            <nav className="navbar is-dark is-fixed-top" role="navigation" aria-label="main navigation">
                <NavBar>
                    <NavMenuItem link="/">Home</NavMenuItem>
                    <NavMenuItem link="/customers">Customers</NavMenuItem>
                    <NavMenuItem link="/goods">Goods</NavMenuItem>
                    <NavMenuItem link="/invoices">Invoices</NavMenuItem>
                </NavBar>
            </nav>
        </div>
    )
};

export default NavMenu;

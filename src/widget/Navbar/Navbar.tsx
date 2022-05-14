import React, { useEffect, useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import "antd/dist/antd.css";

import styled from "styled-components";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";



import './index.css';
export default function Navbar() {
    const [click, setClick] = useState(false);


    const closeMobileMenu = () => setClick(false);
    return (
        <div className="navbar">
            <div className='navbar-container'>
                <Link to='/' className='navbar-logo'>
                    ENFT
                    <i className='fab fa-typo3' />
                </Link>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                        <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                            MAIN
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link
                            to='/members'
                            className='nav-links'
                            onClick={closeMobileMenu}
                        >
                            MEMBERS
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link
                            to='/approve'
                            className='nav-links'
                            onClick={closeMobileMenu}
                        >
                            APPROVE
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link
                            to='/checkin'
                            className='nav-links'
                            onClick={closeMobileMenu}
                        >
                            CHECK IN
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link
                            to='/profit'
                            className='nav-links'
                            onClick={closeMobileMenu}
                        >
                            PROFIT
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link
                            to='/memo'
                            className='nav-links'
                            onClick={closeMobileMenu}
                        >
                            MEMO
                        </Link>
                    </li>
                    <li>
                        <Link
                            to='/register'
                            className='nav-links-mobile'
                            onClick={closeMobileMenu}
                        >
                            Sign Up
                        </Link>
                    </li>
                </ul>








            </div>



        </div>
    )
}

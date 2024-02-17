/* eslint-disable no-unused-vars */
import React,{useEffect} from 'react';
import { IoSearch } from "react-icons/io5";
import { NavLink } from 'react-router-dom';

const Navbar = () => {

    return (
        <nav>
            <i className="fa-solid fa-bars" id="menu-btn"></i>
            <i className="fa-solid fa-user" id="user-btn"></i>
            <div className="navbar flex">
                <div className="nav-left inner-content">
                    <ul className="flex nav-flex">
                        <li className="nav-item" id="home-btn">
                            <NavLink to={'/'}  className="nav-link">
                                Home
                            </NavLink>
                        </li>
                        <i className="fa-solid fa-xmark nav-link" id="close-btn"></i>
                        <li className="nav-item">
                            <NavLink to={'/movie'} href="/movie" className="nav-link">
                                Movie
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <a href="/watchlist" className="nav-link">
                                Watchlist
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="nav-right">
                    <ul className="flex nav-flex inner-content">
                        <li className="nav-item">
                            <form action="/search" method="get">
                                <input
                                    type="text"
                                    name="query"
                                    className="search-text"
                                    placeholder="Search here..."
                                />
                                <button type="submit" className="search-btn nav-item">
                                    <IoSearch style={{color:'#30E3CA',fontWeight:'500', top:'5px'}} className="fa-solid fa-magnifying-glass"></IoSearch>
                                </button>
                            </form>
                        </li>
                        <li className="nav-item">
                            <i className="fa-solid fa-user" id="profile"></i>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

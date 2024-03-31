/* eslint-disable no-unused-vars */
import React,{useEffect,useState} from 'react';
import { IoSearch } from "react-icons/io5";
import { NavLink,useNavigate } from 'react-router-dom';
import { IoPersonSharp } from "react-icons/io5";
import { useSelector,useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';


const Navbar = () => {
    const [query,setQuery] = useState("");
    const navigate = useNavigate();
    const user = useSelector( state => state.auth.userName)
    let [userName,setUserName] = useState(user) ;
    const dispatch = useDispatch();
    const [display,setDisplay] = useState(false) ;

    useEffect(() => {
        updateUser();
    },[user]);
    


    const updateUser = () => {
        setUserName(user);
    }
    const handleLogout = () => {
        dispatch(logout());
        setUserName(null)
    };
    const handleSubmit = () => {
        console.log(query)
        if(query != " "){
            navigate(`/movie/search/${query}`)
        }
        else{
            window.alert("Please enter movie name");
        }

    }

    return (
        <>
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
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    name="query"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    className="search-text"
                                    placeholder="Search here..."
                                />
                                <button type="submit" className="search-btn nav-item">
                                    <IoSearch style={{color:'#30E3CA',fontWeight:'500', top:'5px'}} className="fa-solid fa-magnifying-glass"></IoSearch>
                                </button>
                            </form>
                            
                        </li>
                        <li className="nav-item fa-user"  onMouseEnter={ () => setDisplay(true)} onMouseLeave={ () => setDisplay(false)}>
                            <IoPersonSharp></IoPersonSharp>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        {userName ? <div className="signup drop-down-box" style={{display:display ? 'block' : 'none'}} onMouseEnter={ () => setDisplay(true)} onMouseLeave={ () => setDisplay(false)}>
            <li className="drop-down-item">{userName}</li><hr />
            <li className="drop-down-item" onClick={ handleLogout }>logout</li>
        </div> : 
        
        <div className="signup drop-down-box" style={{display:display ? 'block' : 'none'}} onMouseEnter={ () => setDisplay(true)} onMouseLeave={ () => setDisplay(false)}>
            <li className="drop-down-item"><NavLink to={'/auth/signup'}>signup</NavLink></li><hr />
            <li className="drop-down-item"> <NavLink to={'/auth/login'}>Login</NavLink></li>
        </div>
        }
        
        
        </> 
    );
};

export default Navbar;

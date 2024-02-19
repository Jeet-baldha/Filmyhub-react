/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Header = () => {


    const [query,setQuery] = useState("");
    const navigate = useNavigate();

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
        <section className="media-discover inner-content">
            <div className="media-container">
                <div className="title">
                    <h1>Welcome</h1>
                    <h3>Millions of movies, TV shows and people to discover. Explore now.</h3>
                </div>
                <div className="search">
                    <form onSubmit={handleSubmit} id="search-form">
                        <input type="text" name="query" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="search for Movie, TV show and person..." />
                        <button type="submit">Search</button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Header;

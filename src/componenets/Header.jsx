/* eslint-disable no-unused-vars */
import React from 'react';

const Header = () => {
    return (
        <section className="media-discover inner-content">
            <div className="media-container">
                <div className="title">
                    <h1>Welcome</h1>
                    <h3>Millions of movies, TV shows and people to discover. Explore now.</h3>
                </div>
                <div className="search">
                    <form action="/search" id="search-form" method="get">
                        <input type="text" name="query" placeholder="search for Movie, TV show and person..." />
                        <button type="submit">Search</button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Header;

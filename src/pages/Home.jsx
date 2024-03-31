/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import MovieCard from '../componenets/MovieCard' // Adjust the path based on your project structure
import axios from 'axios';
import Header from '../componenets/Header';
import { NavLink } from 'react-router-dom';

const Home = () => {

    const [trendingDayList, setTrendingDayList] = useState([]);
    const [trendingWeekList, setTrendingWeekList] = useState([]);
    const [latestMovieList, setLatestMovieList] = useState([]);
    const [popularMovieList, setPopularMovieList] = useState([]);


    const fetchTrendingDayList = async () => {
        const response = await axios.get('http://localhost:3000/trendingMovieListDay');
        setTrendingDayList(response.data.results);
    };

    const fetchTrendingWeekList = async () => {
        const response = await axios.get('http://localhost:3000/trendingMovieListWeek');
        setTrendingWeekList(response.data.results);
    };

    const fetchLatestMovieList = async () => {
        const response = await axios.get('http://localhost:3000/latestMovieList');
        setLatestMovieList(response.data);
    };


    const fetchPopularMovieList = async () => {
        const response = await axios.get('http://localhost:3000/movie/popular');
        setPopularMovieList(response.data.results);
    };


    useEffect(() => {
        fetchTrendingDayList();
        fetchTrendingWeekList();
        fetchLatestMovieList();
        fetchPopularMovieList();
    }, []);

    return (
        <div className=''>
            <div className=''>
                <Header></Header>
                <section className="trending inner-content">
                    <div className="column-container-header flex">
                        <h1>Trending</h1>
                        <div className="selector flex">
                            <div className="anchor today selected">
                                <a href="#" className="non-clickable">Today</a>
                            </div>
                            {/* <div className="anchor week">
                                <a href="#" className="non-clickable">This week</a>
                            </div> */}
                        </div>
                    </div>
                    <div className="column-content flex dayList">
                        {trendingDayList.map((movie) => (
                            <NavLink  to={`/movie/${movie.id}`} key={movie.id}>
                                <MovieCard
                                    id={movie.id}
                                    posterPath={movie.poster_path}
                                    voteAverage={movie.vote_average}
                                    title={movie.title}
                                    releaseDate={movie.release_date}
                                />
                            </NavLink>
                        ))}
                    </div>
                </section>
                <section className="inner-content">
                    <div className="column-container">
                        <div className="latest-trailer">
                            <div className="column-container-header flex">
                                <h1>Latest Trailers</h1>
                                <div className="selector flex">
                                    {/* <div className="anchor selected">
                                        <a href="#" className="non-clickable">Streaming</a>
                                    </div>
                                    <div className="anchor">
                                        <a href="#" className="non-clickable">On TV</a>
                                    </div>
                                    <div className="anchor">
                                        <a href="#">For Rent</a>
                                    </div>
                                    <div className="anchor">
                                        <a href="#" className="non-clickable">On Theaters</a>
                                    </div> */}
                                </div>
                            </div>

                            <div className="column-content flex">
                                {latestMovieList && latestMovieList.map((movie) => (
                                    <div className="trailer-card" key={movie.key}>
                                        <iframe
                                            width="300"
                                            height="169"
                                            style={{ borderRadius: '8px' }}
                                            src={`https://www.youtube.com/embed/${movie.key}`}
                                            title="YouTube video player"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen=""
                                        ></iframe>
                                        <div className="details">
                                            <div className="trailer-details">
                                                <h1>{movie.name}</h1>
                                                <h4>{movie.type}</h4>
                                            </div>
                                            <h4 className="movie-name">
                                                {movie.title}
                                            </h4>
                                            <p className="movie-date" style={{ fontSize: '12px' }}>
                                                {movie.release_date}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section  className="popular inner-content">
                    <div className="column-container-header flex">
                        <h1>What's Popular</h1>
                        <div className="selector flex">
                            {/* <div className="anchor selected">
                                <a href="#">Streaming</a>
                            </div>
                            <div className="anchor">
                                <a href="#">On TV</a>
                            </div>
                            <div className="anchor">
                                <a href="#">For Rent</a>
                            </div>
                            <div className="anchor">
                                <a href="#">On Theaters</a>
                            </div> */}
                        </div>
                    </div>
                    <div className="popular column-content flex">
                        {popularMovieList.map((movie) => (
                            <NavLink to={`/movie/${movie.id}`} key={movie.id}>
                                <MovieCard
                                    id={movie.id}
                                    posterPath={movie.poster_path}
                                    voteAverage={movie.vote_average}
                                    title={movie.title}
                                    releaseDate={movie.release_date}
                                />
                            </NavLink>
                        ))}
                    </div>
                </section>
                {/* Include the Footer component */}
                {/* <Footer /> */}
            </div>
        </div>
    );
};

export default Home;

/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import CastCard from '../componenets/CastCard';
import axios from 'axios';
import { FaHeart } from "react-icons/fa";

function Movie() {

    const [movie,setMovie] = useState({});
    const [cast,setCast] = useState([]);
    const {id} = useParams();

    const fetchMovie = async () => {

        const response = await axios.get('http://localhost:3000/movie/' + id);
        setMovie(response.data.movie);
        setCast(response.data.casts.cast)

    }

    useEffect(() => {
        fetchMovie();
    },[id])

    const addMovie = () =>{

    }

    return (
        <div>
            <div className="background-image"></div>
            <section className="movie-container" style={{ backgroundImage: `url('https://image.tmdb.org/t/p/w500/${movie.backdrop_path}')` }}>
                {movie && (
                    <div className="movie-details">
                        <div className="inner-content flex " id="movie-title-box">
                            <div>
                                <img id="poster-image" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.original_title} />
                            </div>

                            <div className="movie-overview  flex">
                                <h2>{movie.original_title}</h2>
                                <ul className="flex" style={{ gap: '25px' }}>
                                    <li style={{ listStyleType: 'none' }}>{movie.release_date}</li>
                                    { movie.genres &&  movie.genres.map((element) => (
                                        <li key={element.id}>{element.name}</li>
                                    ))}
                                </ul>

                                <div className="movie-icons flex">
                                    <div className="user-score flex">
                                        <div className="icon" style={{ margin: 0 }}>{ movie.vote_average &&  movie.vote_average.toFixed(2)}</div>
                                        <p style={{ padding: '8px', marginRight: '30px' }}>User Score</p>
                                    </div>
                                    <li className="icon" onClick={() => addMovie(movie.id)}>
                                        <FaHeart />
                                    </li>
                                </div>

                                <div>
                                    <h4>Overview</h4>
                                    <p className="overview-text">{movie.overview}</p>
                                </div>

                                <div className="production-details flex">

                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>

            <section className="inner-content">
                <div className="cast-list">
                    <h1>Top Billed Cast</h1>
                    <div className="column-content flex">
                    { cast && cast.map ((person) => (<CastCard key={person.id} person={person} />))}
                    
                        <div className="view-more">
                            <a href="#">View More <i className="fa-solid fa-arrow-right"></i></a>
                        </div>
                    </div>

                    <h4 className="full-cast-link"><a href="#">Full Cast & Crew</a></h4>
                    <hr />
                </div>
            </section>
        </div>
    )
}

export default Movie
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import CastCard from '../componenets/CastCard';
import axios from 'axios';
import { FaHeart } from "react-icons/fa";
import { useSelector } from 'react-redux';


function Movie() {

    const [movie, setMovie] = useState({});
    const [cast, setCast] = useState([]);
    const navigate = useNavigate();
    const [inWatchList, setInWatchList] = useState(false);
    const { id } = useParams();
    const userID = useSelector(state => state.auth.userId);

    const fetchMovie = async () => {

        const response = await axios.get('http://localhost:3000/movie/' + id);
        setMovie(response.data.movie);
        setCast(response.data.casts.cast)

    }

    const findMovie = async () => {
        const response = await axios.get('http://localhost:3000/watchlist/' + id,{headers:{userId: userID}});
        console.log(response.data);
        setInWatchList(response.data); 

    }

    const deleteMovie = async () => {
        try{
            const response = await axios.delete(`http://localhost:3000/watchlist/${id}`,{ headers: {userID:userID}});
            
            if(response.status === 200){
                findMovie();
                alert(response.data.message);
            }
            else{
                alert(response.data.message);
            }

        }
        catch(err){
            alert(err.message);
        }
    }

    useEffect(() => {

        if (userID) {
            findMovie();
        }

    }, [id])

    useEffect(() => {
        fetchMovie();
    }, [id])

    const addMovie = async (id) => {
        console.log(id);

        if (userID != null) {
            console.log(userID)
            const response = await axios.post('http://localhost:3000/movie/add', { id: id, userID: userID });
            if (response.status === 200) {
                setInWatchList(true);
                alert(response.data.message);
            }

        }
        else {
            alert('Please login first');
            navigate('/auth/login');
        }

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
                                    {movie.genres && movie.genres.map((element) => (
                                        <li key={element.id}>{element.name}</li>
                                    ))}
                                </ul>

                                <div className="movie-icons flex">
                                    <div className="user-score flex">
                                        <div className="icon" style={{ margin: 0 }}>{movie.vote_average && movie.vote_average.toFixed(2)}</div>
                                        <p style={{ padding: '8px', marginRight: '30px' }}>User Score</p>
                                    </div>

                                    {inWatchList ? <li className="icon"  onClick={ () => deleteMovie()}> <MdDelete /> </li> :
                                        <li className="icon"  onClick={ () => addMovie(movie.id)}> <FaHeart /> </li>
                                    }
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
                        {cast && cast.map((person) => (<CastCard key={person.id} person={person} />))}

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
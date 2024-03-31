import React, { useEffect, useState } from 'react';
import MovieCard from '../componenets/MovieCard';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

const WatchList = () => {
    const [movieList, setMovieList] = useState([]);
    const navigate = useNavigate();
    const userID = useSelector( state => state.auth.userId);

    const fetchMovieList = async () => {
        console.log(userID);
        if(userID){
            try {
                const response = await axios.get('http://localhost:3000/watchlist',{
                    headers: {
                        "Content-Type": 'application/json',
                        "userID": userID
                    }
                });
                setMovieList(response.data.movieList.results);
                console.log(movieList);
            } catch (error) {
            console.error('Error fetching movie list:', error);
            alert('Error fetching movie list. Please try again.');
        }
    }
        else{
            alert("please login first");
            navigate('/auth/login');
        }
    };

    useEffect(() => {
        fetchMovieList();
    }, []);


    return (
        <>
            <div className="inner-content">
                <div className="movie-content">
                    {movieList && movieList.map((movie) => ( <MovieCard
                                key={movie.id}
                                id={movie.id}
                                posterPath={movie.poster_path}
                                voteAverage={movie.vote_average}
                                title={movie.title}
                                releaseDate={movie.release_date}
                            />) )}
                </div>

            </div>
        </>
    );
};

export default WatchList;

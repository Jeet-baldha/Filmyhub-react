import React, { useEffect, useState } from 'react';
import MovieCard from '../componenets/MovieCard';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SearchList = () => {
    const [movieList, setMovieList] = useState([]);
    const {query} = useParams();

    const fetchMovieList = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/search?query=${query}`);
            setMovieList(response.data.movieList.results);
        } catch (error) {
            console.error('Error fetching movie list:', error);
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

export default SearchList;

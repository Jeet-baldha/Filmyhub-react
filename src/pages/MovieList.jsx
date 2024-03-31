// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import MovieCard from '../componenets/MovieCard';
import axios from 'axios';

const MovieList = () => {
    const [movieList, setMovieList] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [error, setError] = useState(null);

    const fetchMovieList = async () => {
        try {
            const response = await axios.get('http://localhost:3000/movie/popular');
            setMovieList(response.data.results);
        } catch (error) {
            console.error('Error fetching movie list:', error);
            setError('Error fetching movie list. Please try again.');
        }
    };

    useEffect(() => {
        fetchMovieList();
    }, []);

    const handleLoadMore = async () => {
        try {
            setLoading(true);
            const nextPage = page + 1;
            const response = await axios.get(`http://localhost:3000/movie/popular/${nextPage}`);
            const newMovies = response.data.results;

            setPage(nextPage);
            setMovieList((prevMovies) => [...prevMovies, ...newMovies]);
        } catch (error) {
            console.error('Error fetching more movies:', error);
            setError('Error fetching more movies. Please try again.');
        } finally {
            setLoading(false);
        }
    };

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

                {loading && <p>Loading...</p>}
                {movieList && (
                    <button className="btn-load-more" onClick={handleLoadMore} id="load-more">
                        Load More
                    </button>
                )}
            </div>
        </>
    );
};

export default MovieList;

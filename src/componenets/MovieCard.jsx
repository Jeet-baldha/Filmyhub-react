import React from 'react';

const MovieCard = ({ id, posterPath, voteAverage, title, releaseDate }) => {
    return (
        <div className="movie-card">
            <a href={`/movie/${id}`}>
                <img src={`https://image.tmdb.org/t/p/w500/${posterPath}`} alt={`${title} Poster`} />
            </a>
            <div className="details">
                <div className="rating" style={{ fontSize: '12px' }}>
                    {voteAverage.toFixed(2)}
                </div>
                <h4 className="movie-name">{title}</h4>
                <p className="movie-date" style={{ fontSize: '12px' }}>
                    {releaseDate}
                </p>
            </div>
        </div>
    );
};

export default MovieCard;

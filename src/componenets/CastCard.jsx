/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

const CastCard = ({ person }) => {
    return (
        <div className="cast-card">
            {person.profile_path === null ? (
                <img src="https://www.pphfoundation.ca/wp-content/uploads/2018/05/default-avatar.png" alt="Default Avatar" />
            ) : (
                <img src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`} alt={person.name} />
            )}
            <div className="details">
                <h4>{person.name}</h4>
                <p>{person.character}</p>
            </div>
        </div>
    );
};

export default CastCard;

import React from 'react';

import './styles.less';
import { Genre } from '../../../../models';
import { Link } from 'react-router-dom';

interface GenreCardProps {
    genre: Genre;
}

const GenreCard = (props: GenreCardProps) => {
    const renderEmojiByGenre = () => {
        switch (props.genre.genre) {
            case 'комедия':
                return '😁';
            case 'драма':
                return '😭';
            case 'фантастика':
                return '👽';
            case 'ужасы':
                return '👻';
            case 'боевик':
                return '🧨';
            case 'мюзикл':
                return '🎵';
            case 'мультфильм':
                return '🎨';
            default:
                return '';
        }
    };

    const getColorClassByGenre = () => {
        switch (props.genre.genre) {
            case 'комедия':
                return 'mdb-genre-card__yellow';
            case 'драма':
                return 'mdb-genre-card__red';
            case 'фантастика':
                return 'mdb-genre-card__blue';
            case 'ужасы':
                return 'mdb-genre-card__gray';
            case 'боевик':
                return 'mdb-genre-card__yellow';
            case 'мюзикл':
                return 'mdb-genre-card__red';
            case 'мультфильм':
                return 'mdb-genre-card__blue';
            default:
                return '';
        }
    };

    return (
        <Link to={`/movies?genre=${props.genre.id}`}>
            <div className={`mdb-genre-card ${getColorClassByGenre()}`}>
                <div className="mdb-genre-card__icon">{renderEmojiByGenre()}</div>
                <div className="mdb-genre-card__name">{props.genre.genre}</div>
            </div>
        </Link>
    );
};

export default GenreCard;

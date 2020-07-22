import React, { useState, useEffect } from 'react';

import './styles.less';
import { Film } from '../../../../models';
import { getFilmById } from '../../../../helpers';
import { Link } from 'react-router-dom';

interface FilmCardProps {
    film: Film;
}

const FilmCard = (props: FilmCardProps) => {
    const [film, setFilm] = useState(props.film);

    const getFilmDetailData = async () => {
        const filmDetailData = await getFilmById(props.film.filmId);

        if (filmDetailData && filmDetailData.description) {
            setFilm({ ...filmDetailData });
        }
    };

    const renderDescription = (description: string) => {
        if (description && description.length > 170) {
            return `${description.slice(0, 170)}...`;
        }

        return description;
    };

    useEffect(() => {
        getFilmDetailData();
    }, []);

    return (
        <div className="mdb-film-card">
            <Link to={`/movies/${film.filmId}`}>
                <div className="mdb-film-card__poster" style={{ backgroundImage: `url(${film.posterUrl})` }}>
                    <div className="mdb-film-card__description-shadow">{renderDescription(film.description)}</div>
                </div>
                <div className="mdb-film-card__name">{film.nameRu}</div>
            </Link>
        </div>
    );
};

export default FilmCard;

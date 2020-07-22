import React, { useEffect, useState } from 'react';

import { getTopMovies, getGenres, getMoviesByGenre, getMoviesByQuery } from '../../helpers';
import { Film, Genre } from '../../models';
import Loader from '../common/Loader';

import './styles.less';
import FilmCard from './components/FilmCard';
import Slider from 'react-slick';
import settings from './sliderSettings';
import GenreCard from './components/GenreCard';
import { useLocation } from 'react-router-dom';

const MoviesTab = () => {
    const [films, setFilms] = useState<Film[]>(null);
    const [genres, setGenres] = useState<Genre[]>(null);
    const [isLoading, setIsLoading] = useState(true);

    const location = useLocation();

    const setMovieFilters = () => {
        if (location.search) {
            const urlParams = new URLSearchParams(location.search);
            const genre = urlParams.get('genre');
            const searchQuery = urlParams.get('searchQuery');

            if (genre) {
                return getMoviesByGenre(genre);
            }

            if (searchQuery) {
                return getMoviesByQuery(searchQuery);
            }
        }

        return getTopMovies();
    };

    const getTabData = async () => {
        setIsLoading(true);
        const fetchedData = await Promise.all([setMovieFilters(), getGenres()]);

        if (fetchedData[0] && fetchedData[0].length) {
            setFilms([...fetchedData[0]]);
        }

        if (fetchedData[1] && fetchedData[1].length) {
            setGenres([...fetchedData[1]]);
        }

        setIsLoading(false);
    };

    useEffect(() => {
        getTabData();
    }, [location]);

    const renderFilms = () => {
        if (!films || !films.length) {
            return <div className="mdb-movies-tab__no-data">Не удалось получить список фильмов</div>;
        }

        return (
            <div className="mdb-movies-tab__films-list">
                <Slider {...settings}>
                    {films.map((film) => (
                        <FilmCard key={film.filmId} film={film} />
                    ))}
                </Slider>
            </div>
        );
    };

    const renderGenres = () => {
        if (!genres || !genres.length) {
            return <div className="mdb-movies-tab__no-data">Не удалось получить список жанров</div>;
        }

        return (
            <div className="mdb-movies-tab__genres-list">
                <Slider {...settings}>
                    {genres.map((genre) => (
                        <GenreCard key={genre.id} genre={genre} />
                    ))}
                </Slider>
            </div>
        );
    };

    const renderHeader = () => {
        if (location.search) {
            const urlParams = new URLSearchParams(location.search);
            const genre = urlParams.get('genre');
            const searchQuery = urlParams.get('searchQuery');

            if (genre) {
                const genreName = genres.find((g) => String(g.id) === genre).genre;

                return `🔥 Лучшие фильмы жанра: ${genreName}`;
            }

            if (searchQuery) {
                return `Результаты поиска по запросу: ${searchQuery}`;
            }
        }

        return '🔥 Лучшие фильмы';
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="mdb-movies-tab">
            <h5 className="mdb-movies-tab__header">{renderHeader()}</h5>
            {renderFilms()}
            <h5 className="mdb-movies-tab__header">Жанры</h5>
            {renderGenres()}
        </div>
    );
};

export default MoviesTab;

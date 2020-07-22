import React, { useEffect, useState, useRef } from 'react';
import './styles.less';
import Loader from '../common/Loader';
import { getFilmById, getFromLocalStorage, setToLocalStorage } from '../../helpers';
import { Film, User, Comment } from '../../models';
import CustomButton from '../common/CustomButton';
import LinkButton from '../common/LinkButton';
import { v4 as uuidv4 } from 'uuid';
import Cross from '../common/Cross';
import { Link } from 'react-router-dom';
import Arrow from '../common/Arrow';

interface FilmDetailProps {
    match: {
        params: {
            id: number;
        };
    };
    user: User;
    onLoginClick: () => void;
}

const FilmDetail = (props: FilmDetailProps) => {
    const {
        match: {
            params: { id },
        },
        user,
        onLoginClick,
    } = props;

    const [film, setFilm] = useState<Film>(null);
    const [comments, setComments] = useState<Comment[]>(null);

    const newCommentArea = useRef<HTMLTextAreaElement>();

    const getFilmDetailData = async () => {
        const filmDetailData = await getFilmById(id);

        if (filmDetailData && filmDetailData.description) {
            setFilm({ ...filmDetailData });
        }
    };

    const getFilmComments = () => {
        const savedComments = getFromLocalStorage<Comment>(`comments-${id}`);
        setComments(savedComments);
    };

    useEffect(() => {
        getFilmDetailData();
    }, []);

    useEffect(() => {
        getFilmComments();
    }, [user]);

    const onCommentAdd = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        e.stopPropagation();

        const newComment: Comment = {
            id: uuidv4(),
            userId: user.id,
            userName: user.login,
            text: newCommentArea.current.value,
        };

        setToLocalStorage(`comments-${id}`, [newComment, ...comments]);
        setComments([newComment, ...comments]);
    };

    const onCommentDelete = (commentId: string) => {
        const newComments = comments.filter((comment) => comment.id !== commentId);

        setToLocalStorage(`comments-${id}`, [...newComments]);
        setComments([...newComments]);
    };

    const renderCountries = () => {
        return film.countries
            .map((country, index) => {
                if (index > 0) {
                    return ` ${country.country}`;
                }

                return country.country;
            })
            .toString();
    };

    const renderGenres = () => {
        return film.genres
            .map((genre, index) => {
                if (index > 0) {
                    return ` ${genre.genre}`;
                }

                return genre.genre;
            })
            .toString();
    };

    const renderNewCommentField = () => {
        if (!user) {
            return (
                <div className="mdb-film-detail__no-user">
                    <LinkButton onClick={onLoginClick}>Войдите</LinkButton>
                    <span> чтобы оставить комментарий.</span>
                </div>
            );
        }

        return (
            <div className="mdb-film-detail__new-comment">
                <textarea
                    rows={5}
                    placeholder="Введите комментарий..."
                    className="mdb-film-detail__new-comment-input"
                    ref={newCommentArea}
                ></textarea>
                <CustomButton onClick={onCommentAdd}>Опубликовать</CustomButton>
            </div>
        );
    };

    const renderComments = () => {
        if (!comments.length) {
            return 'Никто ещё не оставлял комментариев';
        }

        return comments.map((comment) => (
            <div key={comment.id} className="mdb-film-detail__comment">
                <div className="mdb-film-detail__comment-user">{comment.userName}</div>
                <div className="mdb-film-detail__comment-text">{comment.text}</div>
                {user && comment.userId === user.id && (
                    <div onClick={() => onCommentDelete(comment.id)} className="mdb-film-detail__comment-delete">
                        <Cross />
                    </div>
                )}
            </div>
        ));
    };

    if (!film) {
        return <Loader />;
    }

    return (
        <div className="mdb-film-detail">
            <Link className="mdb-film-detail__back" to="/movies">
                <Arrow />
            </Link>
            <div className="mdb-film-detail__info">
                <div className="mdb-film-detail__poster" style={{ backgroundImage: `url(${film.posterUrl})` }} />
                <div className="mdb-film-detail__text">
                    <div className="mdb-film-detail__row">
                        <div>Название:</div>
                        <b>{film.nameRu}</b>
                    </div>
                    <div className="mdb-film-detail__row">
                        <div>Страна:</div>
                        {renderCountries()}
                    </div>
                    <div className="mdb-film-detail__row">
                        <div>Жанр:</div>
                        {renderGenres()}
                    </div>
                    <div className="mdb-film-detail__description">{film.description}</div>
                </div>
            </div>
            <h4 className="mdb-film-detail__subheader">Комментарии</h4>
            {renderNewCommentField()}
            <div className="mdb-film-detail__comments">{renderComments()}</div>
        </div>
    );
};

export default FilmDetail;

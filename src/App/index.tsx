import React, { useState, useEffect } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import Header from '../components/Header';

import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import './reset.less';
import './styles.less';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { User, FieldErrors } from '../models';
import LoginForm from '../components/LoginForm';
import {
    getFromLocalStorage,
    setToLocalStorage,
    setCookie,
    getUserByLogin,
    getCookie,
    getUserById,
    deleteCookie,
} from '../helpers';
import TabsControls from '../components/TabsControls';
import MoviesTab from '../components/MoviesTab';
import FilmDetail from '../components/FilmDetail';
import Footer from '../components/Footer';
import TvTab from '../components/TvTab';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#333333',
        },
        secondary: {
            main: '#e5261e',
            dark: '#cc221b',
        },
    },
});

const App = () => {
    const [currentUser, setCurrentUser] = useState<User>(null);
    const [fieldErros, setFieldErrors] = useState<FieldErrors>({});
    const [isLoginFormVisible, setLoginFormVisibility] = useState(false);

    useEffect(() => {
        const userId = getCookie('currentUserId');

        if (userId) {
            const users = getFromLocalStorage<User>('users');
            const user = getUserById(users, userId);

            if (user) {
                setCurrentUser(user);
            }
        }
    }, []);

    const onRegister = (newUser: User) => {
        setFieldErrors({});
        const users = getFromLocalStorage<User>('users');

        const isUserExists = Boolean(getUserByLogin(users, newUser.login));

        if (isUserExists) {
            setFieldErrors({ login: 'Пользователь с таким логином уже существует' });
            return;
        }

        users.push(newUser);
        setToLocalStorage('users', users);
        setCookie('currentUserId', newUser.id, 72);
        setCurrentUser(newUser);
        setLoginFormVisibility(false);
    };

    const onLogin = (login: string, password: string, remember: boolean) => {
        setFieldErrors({});
        const users = getFromLocalStorage<User>('users');
        const user = getUserByLogin(users, login);

        if (user && user.password === password) {
            setCurrentUser(user);

            if (remember) {
                setCookie('currentUserId', user.id, 72);
            }
            setLoginFormVisibility(false);
        } else if (!user) {
            setFieldErrors({ login: 'Пользователь не найден' });
        } else if (user.password !== password) {
            setFieldErrors({ password: 'Пароль не верный' });
        } else {
            setFieldErrors({ login: 'Что-то пошло не так...' });
        }
    };

    const onLogoutClick = () => {
        deleteCookie('currentUserId');
        setCurrentUser(null);
    };

    const onNameChange = (updatedUser: User) => {
        const users = getFromLocalStorage<User>('users');
        const updatedUsers = users.filter((user) => user.id !== updatedUser.id);

        setCurrentUser(updatedUser);

        setToLocalStorage('users', [...updatedUsers, updatedUser]);
    };

    const renderForm = () => {
        if (isLoginFormVisible) {
            return (
                <LoginForm
                    fieldErros={fieldErros}
                    onCancel={() => setLoginFormVisibility(false)}
                    onLogin={onLogin}
                    onRegister={onRegister}
                />
            );
        }

        return null;
    };

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <div className="mdb-app-container">
                    <Header
                        user={currentUser}
                        onLogoutClick={onLogoutClick}
                        onLoginClick={() => setLoginFormVisibility(true)}
                        onNameChange={onNameChange}
                    />
                    <TabsControls />
                    <Switch>
                        <Route exact path="/">
                            <Redirect to="/movies" />
                        </Route>
                        <Route
                            exact
                            path="/movies/:id"
                            render={(props) => (
                                <FilmDetail
                                    {...props}
                                    onLoginClick={() => setLoginFormVisibility(true)}
                                    user={currentUser}
                                />
                            )}
                        />
                        <Route path="/movies">
                            <MoviesTab />
                        </Route>
                        <Route path="/tv">
                            <TvTab />
                        </Route>
                    </Switch>
                    {renderForm()}
                </div>
                <Footer />
            </Router>
        </ThemeProvider>
    );
};

export default App;

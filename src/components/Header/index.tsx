import React, { useState, ChangeEvent } from 'react';
import CustomButton from '../common/CustomButton';
import CustomTextField from '../common/CustomTextField';
import Logo from '../common/Logo';
import LogoMobile from '../common/LogoMobile';
import LinkButton from '../common/LinkButton';
import { useHistory } from 'react-router-dom';

import { isScreenMd } from '../../helpers';

import './styles.less';
import { User } from '../../models';
import UserInfo from '../UserInfo';

interface HeaderProps {
    user: User;
    onLoginClick: () => void;
    onLogoutClick: () => void;
    onNameChange: (updatedUser: User) => void;
}

const Header = (props: HeaderProps) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const history = useHistory();

    const onSearchQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        setSearchQuery(value);
    };

    const onLoginClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();

        props.onLoginClick();
    };

    const renderLoginButton = () => {
        if (isScreenMd()) {
            return <CustomButton onClick={onLoginClick}>Войти</CustomButton>;
        }

        return <LinkButton onClick={onLoginClick}>Войти</LinkButton>;
    };

    const renderUserTools = () => {
        if (props.user) {
            return <UserInfo onNameChange={props.onNameChange} user={props.user} onLogoutClick={props.onLogoutClick} />;
        }

        return renderLoginButton();
    };

    const renderLogo = () => {
        if (isScreenMd()) {
            return <Logo />;
        }

        return <LogoMobile />;
    };

    const onSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (searchQuery.length > 3) {
            history.push(`/movies?searchQuery=${searchQuery}`);

            setSearchQuery('');
        }
    };

    return (
        <header className="mdb-header">
            <div className="mdb-header__logo">{renderLogo()}</div>
            <div className="mdb-header__search">
                <form onSubmit={onSearchSubmit}>
                    <CustomTextField
                        className="mdb-header__input"
                        value={searchQuery}
                        onChange={onSearchQueryChange}
                        placeholder="Поиск..."
                    />
                    <LinkButton type="submit">Найти</LinkButton>
                </form>
            </div>
            <div className="mdb-header__user">{renderUserTools()}</div>
        </header>
    );
};

export default Header;

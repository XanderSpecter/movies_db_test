import React, { useState, ChangeEvent } from 'react';
import LinkButton from '../common/LinkButton';

import { User } from '../../models';
import { isScreenMd } from '../../helpers';

import PersonIcon from '@material-ui/icons/Person';

import './styles.less';
import CustomTextField from '../common/CustomTextField';

interface UserInfoProps {
    user: User;
    onLogoutClick: () => void;
    onNameChange: (updatedUser: User) => void;
}

const UserInfo = (props: UserInfoProps) => {
    const { user } = props;

    const [showMobilePopup, setShowMobilePopup] = useState(false);
    const [isNameEditing, setIsNameEditing] = useState(false);

    const [userName, setUserName] = useState(user.name);

    const onLogoutClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();

        props.onLogoutClick();
    };

    const onNameChange = () => {
        if (userName.length) {
            props.onNameChange({
                ...props.user,
                name: userName,
            });
        }

        setIsNameEditing(false);
    };

    const renderName = () => {
        if (isNameEditing) {
            return (
                <CustomTextField
                    value={userName}
                    focused={true}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)}
                    onBlur={onNameChange}
                />
            );
        }

        return (
            <div onClick={() => setIsNameEditing(true)} className="mdb-user-info__user-name">
                {user.name}
            </div>
        );
    };

    const renderUserDataMobilePopup = () => {
        if (showMobilePopup) {
            return (
                <div className="mdb-user-info-mobile__popup">
                    {renderName()}
                    <LinkButton onClick={onLogoutClick}>Выйти</LinkButton>
                </div>
            );
        }

        return null;
    };

    const renderUserData = () => {
        if (isScreenMd()) {
            return (
                <>
                    {renderName()}
                    <LinkButton onClick={onLogoutClick}>Выйти</LinkButton>
                </>
            );
        }

        return (
            <div className="mdb-user-info-mobile">
                <div onClick={() => setShowMobilePopup(!showMobilePopup)} className="mdb-user-info-mobile__icon">
                    <PersonIcon />
                </div>
                {renderUserDataMobilePopup()}
            </div>
        );
    };

    return <div className="mdb-user-info">{renderUserData()}</div>;
};

export default UserInfo;

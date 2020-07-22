import React, { useState, ChangeEvent, useEffect } from 'react';

import './styles.less';
import { User, FieldErrors } from '../../models';
import PopupShadow from '../common/PopupShadow';
import CustomTextField from '../common/CustomTextField';
import LinkButton from '../common/LinkButton';
import CustomButton from '../common/CustomButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { v4 as uuidv4 } from 'uuid';

interface LoginFormProps {
    onLogin: (login: string, password: string, remember: boolean) => void;
    onRegister: (newUser: User) => void;
    onCancel: () => void;
    fieldErros?: FieldErrors;
}

const LoginForm = (props: LoginFormProps) => {
    const [name, setName] = useState<string>('');
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [remember, setRemember] = useState(false);

    const [isLogin, setIsLogin] = useState(true);

    const [fieldErrors, setFieldErrors] = useState(props.fieldErros);

    useEffect(() => {
        setFieldErrors(props.fieldErros);
    }, [props.fieldErros]);

    const renderFormTypeInfo = () => (isLogin ? 'Вход' : 'Регистрация');

    const changeFormType = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        e.stopPropagation();

        setFieldErrors({});
        setLogin('');
        setPassword('');
        setName('');
        setRemember(false);
        setIsLogin(!isLogin);
    };

    const renderChangeButtonName = () => (isLogin ? 'Регистрация' : 'Вход');

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (isLogin) {
            const errors: FieldErrors = {};

            if (!login.length) {
                errors.login = 'Не заполнено';
            }

            if (!password.length) {
                errors.password = 'Не заполнено';
            }

            if (errors.name || errors.password) {
                setFieldErrors({ ...errors });

                return;
            }

            props.onLogin(login, password, remember);

            return;
        }

        const errors: FieldErrors = {};

        if (!login.length) {
            errors.login = 'Не заполнено';
        }

        if (!password.length) {
            errors.password = 'Не заполнено';
        }

        if (!name.length) {
            errors.name = 'Не заполнено';
        }

        if (errors.name || errors.password || errors.name) {
            setFieldErrors({ ...errors });

            return;
        }

        const newUser: User = {
            name,
            login,
            password,
            id: uuidv4(),
        };

        props.onRegister(newUser);
    };

    const renderExtraFields = () => {
        if (isLogin) {
            // TO DO надо подогнать стили под макет
            return (
                <div className="mdb-login-form__field">
                    <FormControlLabel
                        control={
                            <Checkbox checked={remember} onChange={() => setRemember(!remember)} name="remember" />
                        }
                        label="Запомнить"
                    />
                </div>
            );
        }

        return (
            <>
                <div className="mdb-login-form__field">
                    <CustomTextField
                        error={Boolean(fieldErrors.name)}
                        helperText={fieldErrors.name}
                        placeholder="Имя"
                        value={name}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    />
                </div>
            </>
        );
    };

    return (
        <PopupShadow onOutsideClick={props.onCancel}>
            <form onSubmit={onSubmit} className="mdb-login-form">
                <h4 className="mdb-login-form__header">{renderFormTypeInfo()}</h4>
                <div className="mdb-login-form__fields">
                    <div className="mdb-login-form__field">
                        <CustomTextField
                            error={Boolean(fieldErrors.login)}
                            helperText={fieldErrors.login}
                            placeholder="Логин"
                            value={login}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setLogin(e.target.value)}
                        />
                    </div>
                    <div className="mdb-login-form__field">
                        <CustomTextField
                            error={Boolean(fieldErrors.password)}
                            helperText={fieldErrors.password}
                            placeholder="Пароль"
                            value={password}
                            type="password"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                        />
                    </div>
                    {renderExtraFields()}
                </div>
                <div className="mdb-login-form__controls">
                    <LinkButton onClick={changeFormType}>{renderChangeButtonName()}</LinkButton>
                    <CustomButton type="submit">{renderFormTypeInfo()}</CustomButton>
                </div>
            </form>
        </PopupShadow>
    );
};

export default LoginForm;

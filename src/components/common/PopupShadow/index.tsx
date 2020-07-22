import React, { ReactNode, useRef } from 'react';

import './styles.less';

interface PopupShadowProps {
    children: ReactNode;
    onOutsideClick?: () => void;
}

const PopupShadow = (props: PopupShadowProps) => {
    const shadow = useRef();
    const onOutsideClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const isClickOnShadow = shadow.current === event.target;

        if (isClickOnShadow && props.onOutsideClick) {
            props.onOutsideClick();
        }
    };

    return (
        <div ref={shadow} onClick={onOutsideClick} className="mdb-popup-shadow">
            {props.children}
        </div>
    );
};

export default PopupShadow;

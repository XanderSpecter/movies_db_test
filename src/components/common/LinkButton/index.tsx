import React from 'react';

import './styles.less';

const LinkButton = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button {...props} className="mdb-link-button">
        {props.children}
    </button>
);

export default LinkButton;

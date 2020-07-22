import React from 'react';
import Button, { ButtonProps } from '@material-ui/core/Button';

import './styles.less';

const CustomButton = (props: ButtonProps) => {
    return (
        <Button {...props} variant="contained" color="secondary">
            {props.children}
        </Button>
    );
};

export default CustomButton;

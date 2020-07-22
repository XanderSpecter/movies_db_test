import React from 'react';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';

import './styles.less';

type CustomTextFieldProps = TextFieldProps;

const CustomTextField = (props: CustomTextFieldProps) => <TextField {...props} />;

export default CustomTextField;

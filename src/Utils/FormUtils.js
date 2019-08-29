import React from 'react';
import {Item, Input} from 'native-base';

const FormLogin = ({name, onChangeText, style}) => (
  <Item>
    <Input style={style} placeholder={name} onChangeText={onChangeText} />
  </Item>
);

export default FormLogin;

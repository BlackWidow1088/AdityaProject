import React, { useState, useRef } from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';
import inputValidIcon from '../../images/done.svg';
import './InputTextField.scss';

const InputValidationCheckbox = ({ validationFunction, value, valid_bool_id }) => {
        return (
            <InputGroup.Append>
                <InputGroup.Text><img src={inputValidIcon} style={{ 'padding': '4px 4px 21px 2px' }} /></InputGroup.Text>
            </InputGroup.Append>
        )

}


export default function InputTextField(props) {

    const { validationFunction, label, defaultValue } = props;
    let myInp = useRef(null);
    
    const handleChange = (ev) => {
        if (props.onChange) {
            props.onChange(ev);
        }
    }

    return (
        
        <InputGroup className={`InputTextField  ${props.className}`} onChange={handleChange} >
            <InputGroup.Prepend>
                <InputGroup.Text onClick={() => {myInp.focus()}}>{label}</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl ref={(ip) => myInp = ip} id="basic-url" aria-label="With textarea" defaultValue={defaultValue} />
            <InputValidationCheckbox validationFunction={validationFunction} value={defaultValue} valid_bool_id="secret_input" />
        </InputGroup>
    )
}

InputTextField.defaultProps = {
    label: '',
    value: ''
}
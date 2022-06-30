import React from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    labelHidden?: boolean;
}

const InputLabel: React.FC<Props> = (props) => {
    return (
        <>
            <label htmlFor={props.id} hidden={props.labelHidden}>
                {props.label}
            </label>
            <input {...props} />
        </>
    );
};

export default InputLabel;

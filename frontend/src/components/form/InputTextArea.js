import {
    FormErrorMessage,
    FormLabel,
    Textarea,
} from '@chakra-ui/react';
import React from 'react';

export const InputTextArea = ({ label, name, errors, register}) => {

    return (
        <>
            <FormLabel htmlFor={name}>{label}</FormLabel>
            <Textarea
                id={name} {...register(name)}
                placeholder="Something here ... "
                size="sm"
                resize='vertical'
            />
            <FormErrorMessage>
                {errors[name] && errors[name].message}
            </FormErrorMessage>
        </>
    );
};

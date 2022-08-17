import {
    FormErrorMessage,
    FormLabel,
    Input,
} from '@chakra-ui/react';
import React from 'react';

export const InputText = ({ label, name, errors, register}) => {

    return (
        <>
            <FormLabel htmlFor={name}>{label}</FormLabel>
            <Input id={name} {...register(name)} />
            <FormErrorMessage>
                {errors[name] && errors[name].message}
            </FormErrorMessage>
        </>
    );
};

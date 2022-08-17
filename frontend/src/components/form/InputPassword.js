import {
    Button,
    FormErrorMessage,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
} from '@chakra-ui/react';
import React from 'react';

export const InputPassword = ({ label, name, register, errors }) => {
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);

    return (
        <>
            <FormLabel htmlFor={name}>{label}</FormLabel>
            <InputGroup size="md">
                <Input
                    pr="4.5rem"
                    type={show ? 'text' : 'password'}
                    id={name}
                    {...register(name)}
                />
                <InputRightElement width="4.5rem">
                    <Button
                        colorScheme={
                            errors[name] && errors[name].message
                                ? 'red'
                                : 'whatsapp'
                        }
                        h="1.75rem"
                        size="sm"
                        onClick={handleClick}
                    >
                        {show ? 'Hide' : 'Show'}
                    </Button>
                </InputRightElement>
            </InputGroup>
            <FormErrorMessage>
                {errors[name] && errors[name].message}
            </FormErrorMessage>
        </>
    );
};

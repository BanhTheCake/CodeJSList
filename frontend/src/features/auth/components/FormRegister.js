import { Button, ButtonGroup, FormControl, Text } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { InputPassword } from '../../../components/form/InputPassword';
import { InputText } from '../../../components/form/InputText';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup
    .object({
        username: yup.string().required('Username is require'),
        password: yup.string().required('Password is require'),
        cfpassword: yup
            .string()
            .required('Confirm Password is require')
            .oneOf([yup.ref('password')], 'Passwords do not match'),
    })
    .required();


export const FormRegister = ({ onSubmit, isLoading, error }) => {

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl isInvalid={errors.username} mb="3">
                            <InputText
                                label="Username"
                                name="username"
                                register={register}
                                errors={errors}
                            />
                        </FormControl>
                        <FormControl isInvalid={errors.password} mb="3">
                            <InputPassword
                                label="Password"
                                name="password"
                                register={register}
                                errors={errors}
                            />
                        </FormControl>
                        <FormControl isInvalid={errors.cfpassword} mb="3">
                            <InputPassword
                                label="Confirm Password"
                                name="cfpassword"
                                register={register}
                                errors={errors}
                            />
                        </FormControl>
                        <ButtonGroup gap="4" w="full" mb='3'>
                            <Button
                                mt={4}
                                colorScheme="teal"
                                isLoading={isLoading ? true : false}
                                type="submit"
                                w="full"
                            >
                                Register
                            </Button>
                            <Link to="/login">
                                <Button
                                    mt={4}
                                    colorScheme="gray"
                                    type="button"
                                    w="full"
                                >
                                    Login
                                </Button>
                            </Link>
                        </ButtonGroup>
                            {!isLoading && error ? (
                                <Text
                                    fontSize="lg"
                                    fontWeight="normal"
                                    textAlign="center"
                                >
                                    {error}
                                </Text>
                            ) : null}
                    </form>
        </>
    );
};

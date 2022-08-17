import { Box, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getUserLogin } from '../authSlice';
import { FormLogin } from '../components/FormLogin';
import { useNavigate } from 'react-router-dom';

const Wapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
`;

export const Login = () => {
    const [data, setData] = useState({});

    const isLoading = useSelector((state) => state.auth.isLoading);
    const error = useSelector((state) => state.auth.error);

    const dispatch = useDispatch();

    let navigate = useNavigate();

    useEffect(() => {
        if (Object.keys(data).length > 0) {
            const { username, password } = data;
            dispatch(
                getUserLogin({
                    username,
                    password,
                })
            )
                .unwrap()
                .then(() => {
                    return navigate('/home');
                });
        }
    }, [data, dispatch, navigate]);

    const onSubmit = (values) => {
        setData(values);
    };

    return (
        <>
            <Wapper>
                <Box
                    m="auto"
                    p={6}
                    borderWidth="1px"
                    borderRadius="2xl"
                    boxShadow="base"
                    maxW="335px"
                >
                    <Text fontSize="4xl" fontWeight="semibold" mb="4">
                        Login
                    </Text>
                    <FormLogin
                        onSubmit={onSubmit}
                        isLoading={isLoading}
                        error={error}
                    />
                </Box>
            </Wapper>
        </>
    );
};

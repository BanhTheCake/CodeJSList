import { Box, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getUserRegister } from '../authSlice';
import { useNavigate } from "react-router-dom";
import { FormRegister } from '../components/FormRegister';

const Wapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
`;

export const Register = () => {

    const [data, setData] = useState({});

    const isLoading = useSelector((state) => state.auth.isLoading);
    const error = useSelector((state) => state.auth.error);

    const dispatch = useDispatch();

    let navigate = useNavigate();

    useEffect(() => {
        if (Object.keys(data).length > 0) {
            dispatch(getUserRegister(data)).unwrap()
            .then(() => {
                return navigate('/login')
            })
        }
    }, [data, dispatch, navigate]);

    const onSubmit = (values) => {
        const { username, password } = values;
        setData({ username, password });
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
                >
                    <Text fontSize="4xl" fontWeight="semibold" mb="4">
                        Register
                    </Text>
                    <FormRegister onSubmit={onSubmit} isLoading={isLoading} error={error} />
                </Box>
            </Wapper>
        </>
    );
};

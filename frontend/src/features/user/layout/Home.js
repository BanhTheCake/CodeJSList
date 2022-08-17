import {
    Button,
    Center,
    Container,
    Flex,
    Text,
} from '@chakra-ui/react';
import React, { useCallback} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import autoUpperCase from '../../../custom/autoUpperCaseFirstLetter';
import { userLogOut } from '../../auth/authSlice';
import { LayoutHome } from '../components/LayoutHome';

export const Home = () => {
    const currentUser = useSelector((state) => state.user.currentUser);
    const error = useSelector((state) => state.user.error);
    const isLogOut = useSelector((state) => state.auth.isLoading);

    if (error) console.log(error);

    const dispatch = useDispatch();

    const handleLogOut = useCallback(() => {
        dispatch(userLogOut());
    }, [dispatch]);

    return (
        <>
            <Container maxW="container.xl">
                <Flex color="white" gap="2" justify="flex-end" pt="3">
                    <Center color="black" fontWeight="semibold">
                        <Text>
                            {currentUser?.username &&
                                autoUpperCase(currentUser.username)}
                        </Text>
                    </Center>
                    <Button
                        colorScheme="blue"
                        isLoading={isLogOut}
                        size="md"
                        variant="ghost"
                        borderRadius="md"
                        onClick={handleLogOut}
                    >
                        Log out
                    </Button>
                </Flex>
                <LayoutHome />
            </Container>
        </>
    );
};

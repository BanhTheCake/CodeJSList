import { AddIcon, ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import {
    Button,
    ButtonGroup,
    Center,
    Fade,
    Flex,
    IconButton,
    Spinner,
    Text,
    useDisclosure
} from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    thunkCreateNewPost, thunkGetAllPost, updateFilter
} from '../userSlice';
import { BoxLayout } from './BoxLayout';
import { ModalPost } from './ModalPost';

export const LayoutHome = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const currentPostList = useSelector((state) => state.user.currentPostList);
    const filter = useSelector((state) => state.user.filter);

    const [dataEdit, setDataEdit] = useState({});
    const [pageNumber, setPageNumber] = useState(1);

    const [isFirstRender, setIsFirstRender] = useState(true);
    const [isGetAllPost, setIsGetAllPost] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isCreateNewPost, setIsCreateNewPost] = useState(false);
    const [isRefresh, setIsRefresh] = useState(false)

    const dispatch = useDispatch();

    useEffect(() => {
        if (isFirstRender) {
            dispatch(updateFilter({ _offset: 0, _limit: 2 }));
            setIsFirstRender(false);
            return;
        }

        setIsGetAllPost(true);
        dispatch(thunkGetAllPost(filter))
            .unwrap()
            .then(() => {
                setIsGetAllPost(false);
            })
            .catch(() => {
                setIsGetAllPost(false);
            });
    }, [dispatch, isFirstRender, JSON.stringify(filter), isRefresh]);

    const handleClickCreate = useCallback(() => {
        setDataEdit({});
        setIsEditing(false);
        onOpen();
    }, [onOpen]);

    const handleCreateNewPost = useCallback(
        (values) => {
            setIsCreateNewPost(true);
            dispatch(thunkCreateNewPost(values))
                .unwrap()
                .then(() => {
                    setIsCreateNewPost(false);
                    onClose();
                    return dispatch(updateFilter({ _offset: 0, _limit: 2}))
                })
                .catch(() => {
                    setIsCreateNewPost(false);
                    onClose();
                });
        },
        [dispatch, onClose]
    );

    useEffect(() => {
        setPageNumber((filter?._offset / filter?._limit) + 1)
    }, [JSON.stringify(filter)])
    
    const handleMorePost = useCallback(() => {
        const newFilter = {
            _offset: filter._offset + filter._limit,
            _limit: filter._limit,
        };
        dispatch(updateFilter(newFilter));
    }, [dispatch, filter]);

    const handleBackPost = () => {
        const newFilter = {
            _offset: filter._offset - filter._limit,
            _limit: filter._limit,
        };
        dispatch(updateFilter(newFilter));
    }

    return (
        <>
            {isGetAllPost ? (
                <Center>
                    <Spinner mt="20" size="lg" color="green" />
                </Center>
            ) : (
                <>
                    <Flex
                        m="auto"
                        maxW="container.md"
                        color="white"
                        gap="6"
                        direction="column"
                        pt="4"
                        pb="4"
                    >
                        <IconButton
                            w="fit-content"
                            borderRadius="50%"
                            m="auto"
                            colorScheme="green"
                            aria-label="Search database"
                            mb="2"
                            onClick={handleClickCreate}
                            icon={<AddIcon />}
                        />
                        {currentPostList && currentPostList.length === 0 && (
                            <Center>
                                <Text color="GrayText">Nothing ... </Text>
                            </Center>
                        )}
                        {currentPostList &&
                            currentPostList.length > 0 &&
                            currentPostList.map((post) => {
                                return (
                                    <Fade key={post.postid} in={true}>
                                        <BoxLayout
                                            setIsRefresh={setIsRefresh}
                                            postid={post.postid}
                                            title={post.title}
                                            description={post.description}
                                        />
                                    </Fade>
                                );
                            })}
                        <ButtonGroup gap={1} m="auto">
                            <IconButton
                                isDisabled={filter?._offset - filter?._limit < 0}
                                colorScheme="green"
                                aria-label="Search database"
                                icon={<ArrowLeftIcon />}
                                onClick={handleBackPost}
                            />
                            <Button  colorScheme="green">
                                {pageNumber}
                            </Button>
                            <IconButton
                                isDisabled={currentPostList?.length === 0 || currentPostList?.length < filter?._limit}
                                colorScheme="green"
                                aria-label="Search database"
                                icon={<ArrowRightIcon />}
                                onClick={handleMorePost}
                            />
                        </ButtonGroup>
                    </Flex>
                    <ModalPost
                        isOpen={isOpen}
                        onClose={onClose}
                        onSubmit={handleCreateNewPost}
                        isCreateNewPost={isCreateNewPost}
                    />
                </>
            )}
        </>
    );
};

import {
    Box,
    Button,
    ButtonGroup,
    Collapse,
    Fade,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    SlideFade,
    Text,
} from '@chakra-ui/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import autoUpperCase from '../../../custom/autoUpperCaseFirstLetter';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { useDispatch, useSelector } from 'react-redux';
import { thunkDeletePost, thunkGetAllPost, thunkUpdatePost, updateFilter } from '../userSlice';
import { CopyToClipboard } from '../../../components/clipboard/CopyToClipboard';

export const BoxLayout = ({
    title,
    description,
    postid,
    setIsRefresh
}) => {

    const filter = useSelector((state) => state.user.filter)

    const [currentDescription, setCurrentDescription] = useState(description);
    const [currentText, setCurrentText] = useState(title);

    const [show, setShow] = useState(false);
    const handleToggle = () => setShow(!show);

    const [heightText, setHeightText] = useState(0);
    const [deletePostId, setDeletePostid] = useState('');

    const [isUpdatePost, setIsUpdatePost] = useState(false);
    const [isFirstRender, setIsFirstRender] = useState(true);
    const [isEditTitle, setIsEditTitle] = useState(false);
    const [isDeletePost, setIsDeletePost] = useState(false);

    const textRef = useRef();
    const titleRef = useRef();
    const headingRef = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!textRef.current || isFirstRender) {
            setIsFirstRender(false);
            setHeightText(
                textRef.current?.getBoundingClientRect()?.height || 0
            );
            return;
        }
        setHeightText(textRef.current?.getBoundingClientRect()?.height || 0);
    }, [currentDescription]);

    useEffect(() => {
        if (isEditTitle === true) {
            titleRef.current.focus();
            return;
        }
    }, [titleRef.current, isEditTitle]);

    const handleClickUpdate = useCallback(
        ({ postid }) => {
            setIsUpdatePost(true);
            dispatch(
                thunkUpdatePost({
                    title: currentText,
                    description: currentDescription,
                    postid,
                })
            )
                .unwrap()
                .then(() => {
                    setIsUpdatePost(false);
                    setIsEditTitle(false);
                })
                .catch(() => {
                    setIsUpdatePost(false);
                    setIsEditTitle(false);
                });
        },
        [currentDescription, dispatch, currentText]
    );

    const handleClickDelete = useCallback(
        (postid) => {
            setDeletePostid(postid);
            setIsDeletePost(true);
            dispatch(thunkDeletePost(postid))
                .unwrap()
                .then(() => {
                    setIsRefresh(prev => !prev)
                    setIsDeletePost(false);
                })
                .catch(() => {
                    setIsRefresh(prev => !prev)
                    setIsDeletePost(false);
                });
        },
        [dispatch, JSON.stringify(filter)]
    );

    return (
        <>
            <Box
                p="3"
                borderRadius="lg"
                border="2px"
                borderColor="teal"
                color="black"
            >
                {isEditTitle ? (
                    <Fade in={true}>
                        <InputGroup size="md">
                            <Input
                                ref={titleRef}
                                pr="4.5rem"
                                size="md"
                                border="none"
                                borderRadius="5"
                                mb="3"
                                bg="whatsapp.500"
                                _focusVisible={{
                                    borderColor: 'transparent',
                                }}
                                fontWeight="semibold"
                                value={currentText}
                                color="white"
                                fontFamily="inherit"
                                onChange={(e) => setCurrentText(e.target.value)}
                            />
                            <InputRightElement width="4.5rem">
                                <Button
                                    h="1.75rem"
                                    size="sm"
                                    onClick={() => setIsEditTitle(false)}
                                >
                                    Close
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </Fade>
                ) : (
                    <Heading
                        ref={headingRef}
                        fontSize="md"
                        bg="whatsapp.500"
                        w="fit-content"
                        px="3"
                        py="1"
                        mb="3"
                        borderRadius="4px"
                        fontWeight="semibold"
                        color="white"
                        fontFamily="inherit"
                        onDoubleClick={() => setIsEditTitle(!isEditTitle)}
                    >
                        {currentText && autoUpperCase(currentText)}
                    </Heading>
                )}
                <Collapse startingHeight={heightText < 50 ? 50 : 62} in={show}>
                    <Box pos="relative">
                        <CodeEditor
                            ref={textRef}
                            value={currentDescription}
                            onChange={(evn) =>
                                setCurrentDescription(evn.target.value)
                            }
                            onFocus={() => setShow(true)}
                            language="js"
                            padding={12}
                            style={{
                                backgroundColor: 'inherit',
                                fontSize: 15,
                                background: '#f5f5f5',
                                fontFamily:
                                    'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                            }}
                        />
                    </Box>
                </Collapse>

                {heightText > 70 && (
                    <SlideFade offsetY="-20px" in={true}>
                        <Button
                            mb="3"
                            size="sm"
                            onClick={handleToggle}
                            mt="1rem"
                        >
                            Show {show ? 'Less' : 'More'}
                        </Button>
                    </SlideFade>
                )}
                <ButtonGroup mt="3" gap="2" w="full">
                    <Button
                        size="md"
                        colorScheme="green"
                        isLoading={isUpdatePost}
                        onClick={() => handleClickUpdate({ postid })}
                    >
                        Update
                    </Button>
                    <Button
                        isLoading={isDeletePost}
                        colorScheme="red"
                        onClick={() => handleClickDelete(postid)}
                    >
                        Delete
                    </Button>
                    <CopyToClipboard size='md' value={currentDescription} colorScheme='facebook' />
                </ButtonGroup>
            </Box>
        </>
    );
};

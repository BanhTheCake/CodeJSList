import React, { useEffect, useMemo } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { InputText } from '../../../components/form/InputText';
import { InputTextArea } from '../../../components/form/InputTextArea';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { InputCodeEditor } from '../../../components/form/InputCodeEditor';

const schema = yup
    .object({
        title: yup.string().required('Title is require'),
        description: yup.string().required('Description is require'),
    })
    .required();

export const ModalPost = ({ isOpen, onClose, onSubmit, isCreateNewPost }) => {
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const handleReset = (value) => {
        onSubmit(value)
        reset({ title: '', description: '' })
    }

    return (
        <>
            <Modal maw isOpen={isOpen} onClose={onClose} isCentered  size='3xl'>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create New Post</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmit(handleReset)}>
                        <ModalBody>
                            <FormControl isInvalid={errors.title} mb="3">
                                <InputText
                                    label="Title"
                                    name="title"
                                    register={register}
                                    errors={errors}
                                />
                            </FormControl>
                            <FormControl isInvalid={errors.description} mb="3">
                                <InputCodeEditor
                                    label="Description"
                                    name="description"
                                    register={register}
                                    errors={errors}
                                />
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                isLoading={isCreateNewPost}
                                colorScheme="blue"
                                mr={3}
                                type="submit"
                            >
                                Save
                            </Button>
                            <Button
                                variant="outline"
                                colorScheme="red"
                                onClick={onClose}
                            >
                                Close
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    );
};

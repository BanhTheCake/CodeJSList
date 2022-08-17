import React from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { FormErrorMessage, FormLabel } from '@chakra-ui/react';

export const InputCodeEditor = ({ name, label, register, errors }) => {
    return (
        <>
            <FormLabel htmlFor={name}>{label}</FormLabel>
            <CodeEditor
                id={name}
                {...register(name)}
                language="js"
                padding={12}
                minHeight={100}
                style={{
                    backgroundColor: 'inherit',
                    fontSize: 15,
                    background: '#f5f5f5',
                    fontFamily:
                        'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                }}
            />
            <FormErrorMessage>
                {errors[name] && errors[name].message}
            </FormErrorMessage>
        </>
    );
};

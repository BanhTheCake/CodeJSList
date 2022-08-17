import { Button } from '@chakra-ui/react';
import React, { useState } from 'react';

export const CopyToClipboard = ({ value, colorScheme, size = 'sm', borderRadius = '5' }) => {
    const [isCopy, setIsCopy] = useState(false);
    let clearCopy;

    const handleCopyToClipboard = () => {
        if (clearCopy) clearTimeout(clearCopy);

        navigator.clipboard.writeText(value);
        setIsCopy(true);
        clearCopy = setTimeout(() => {
            setIsCopy(false);
        }, 5000);
    };

    return (
        <Button
            colorScheme={colorScheme}
            borderRadius={borderRadius}
            size={size}
            onClick={handleCopyToClipboard}
        >
            {isCopy ? 'Copied' : 'Copy'}
        </Button>
    );
};

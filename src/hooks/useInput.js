import { useState } from 'react';

export default function useInput(validatingFunction) {

    const [ inputValue, setInputValue ] = useState("");
    const [ initialized, setInitialized ] = useState(false);

    const errorNoInitialized = validatingFunction(inputValue);
    
    const error = initialized && !validatingFunction(inputValue);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    }

    const handleInitialized = () => {
        setInitialized(true);
    }


    return {inputValue, errorNoInitialized, error, handleInputChange, handleInitialized};
}

import { createContext, useContext, useState } from 'react';

export const SearchParametersContext = createContext(null);

export function SearchParametersProvider({ children }) {
    const [activeUse, setActiveUse] = useState(false);
    const [depth, setDepth] = useState(2);
    const [apiKeyValue, setApiKeyValue] = useState("");
    const [apiKeyState, setApiKeyState] = useState();


    return (
        <SearchParametersContext.Provider
            value={{ activeState: [activeUse, setActiveUse], depthValue: [depth, setDepth], apiKeyVal: [apiKeyValue, setApiKeyValue], apiValidation: [apiKeyState, setApiKeyState] }}
        >
            {children}
        </SearchParametersContext.Provider>
    );
}

export function useSearchParameters() {
    return useContext(SearchParametersContext);
}
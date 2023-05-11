import { createContext, useContext, useState } from 'react';

export const SearchParametersContext = createContext(null);

export function SearchParametersProvider({ children }) {
    const [apiUse, setApiUse] = useState(true);
    const [activeUse, setActiveUse] = useState(false);
    const [depth, setDepth] = useState(2);
    const [apiKeyValue, setApiKeyValue] = useState("");
    const [cseIdValue, setCseIdValue] = useState("");



    return (
        <SearchParametersContext.Provider
            value={{ apiState: [apiUse, setApiUse], activeState: [activeUse, setActiveUse], depthValue: [depth, setDepth], apiKeyState: [apiKeyValue, setApiKeyValue], cseIdState: [cseIdValue, setCseIdValue] }}
        >
            {children}
        </SearchParametersContext.Provider>
    );
}

export function useSearchParameters() {
    return useContext(SearchParametersContext);
}
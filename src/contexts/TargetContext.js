import { createContext, useContext, useState } from 'react';

export const TargetContext = createContext(null);

export function TargetProvider({ children }) {
    const [targetValue, setTargetValue] = useState();
    const [targetValid, setTargetValid] = useState();

    return (
        <TargetContext.Provider
            value={{ targetValue: [targetValue, setTargetValue], targetState: [targetValid, setTargetValid] }}
        >
            {children}
        </TargetContext.Provider>
    );
}

export function useTarget() {
    return useContext(TargetContext);
}
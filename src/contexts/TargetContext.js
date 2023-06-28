import { createContext, useContext, useState } from 'react';

export const TargetContext = createContext(null);

export function TargetProvider({ children }) {
    const [targetValue, setTargetValue] = useState();
    const [targetType, setTargetType] = useState('Name');

    return (
        <TargetContext.Provider
            value={{ targetValue: [targetValue, setTargetValue], targetType: [targetType, setTargetType] }}
        >
            {children}
        </TargetContext.Provider>
    );
}

export function useTarget() {
    return useContext(TargetContext);
}
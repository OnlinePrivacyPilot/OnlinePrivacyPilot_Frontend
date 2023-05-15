import { createContext, useContext, useReducer } from 'react';

const FingerprintsContext = createContext(null);

const FingerprintsDispatchContext = createContext(null);

export function FingerprintsProvider({ children }) {
    const [fingerprints, dispatch] = useReducer(
        fingerprintsReducer, []
    );

    return (
        <FingerprintsContext.Provider value={fingerprints}>
            <FingerprintsDispatchContext.Provider value={dispatch}>
                {children}
            </FingerprintsDispatchContext.Provider>
        </FingerprintsContext.Provider>
    );
}

export function useFingerprints() {
    return useContext(FingerprintsContext);
}
  
export function useFingerprintsDispatch() {
    return useContext(FingerprintsDispatchContext);
}

function fingerprintsReducer(fingerprints, action) {
    switch (action.op) {
        case 'new': {
            return [...fingerprints, {
                id: fingerprints.length,
                fingerprint: action.fingerprint
            }];
        }
        case 'delete': {
            return fingerprints.filter(t => t.id !== action.id);
        }
        default: {
            throw Error('Unknown action: ' + action.op);
        }
    }
}

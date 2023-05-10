import { createContext, useContext, useReducer } from 'react';

const FiltersContext = createContext(null);

const FiltersDispatchContext = createContext(null);

export function FiltersProvider({ children }) {
    const [filters, dispatch] = useReducer(
        filtersReducer,
        initialFilters
    );

    return (
        <FiltersContext.Provider value={filters}>
            <FiltersDispatchContext.Provider value={dispatch}>
            {children}
            </FiltersDispatchContext.Provider>
        </FiltersContext.Provider>
    );
}

export function useFilters() {
    return useContext(FiltersContext);
}
  
export function useFiltersDispatch() {
    return useContext(FiltersDispatchContext);
}

function filtersReducer(filters, action) {
    switch (action.op) {
        case 'added': {
            return [...filters, {
                id: action.id,
                value: action.value,
                type: action.type,
                method: 'user_input',
                positive: action.positive
            }];
        }
        case 'deleted': {
            return filters.filter(t => t.id !== action.id);
        }
        default: {
            throw Error('Unknown action: ' + action.op);
        }
    }
}

const initialFilters = [
    { id: 0, value: 'Paul Martin', type: 'name', method: 'user_input', positive: 'true' },
    { id: 1, value: 'Jean-Claude Van Damme', type: 'bizarre', method: 'user_input', positive: 'false' },
    { id: 2, value: 'Michel Martino', type: 'name', method: 'user_input', positive: 'true' },
  ];
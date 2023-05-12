import { createContext, useContext, useReducer } from 'react';

const FiltersContext = createContext(null);

const FiltersDispatchContext = createContext(null);

export function FiltersProvider({ children }) {
    const [filters, dispatch] = useReducer(
        filtersReducer, []
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
    if (action.value !== '') { // if the new filter has a non-empty value
        switch (action.op) {
            case 'add': {
                return [...filters, {
                    id: action.id,
                    value: action.value,
                    type: action.type,
                    method: 'user_input',
                    positive: action.positive
                }];
            }
            case 'delete': {
                return filters.filter(t => t.id !== action.id);
            }
            default: {
                throw Error('Unknown action: ' + action.op);
            }
        }
    } else { // otherwise do not modify the list of filters
        return filters; 
    }
}

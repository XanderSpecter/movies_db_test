export const getFromLocalStorage = <T>(key: string) => {
    if (window && window.localStorage) {
        const valuesString = window.localStorage.getItem(key);

        if (valuesString) {
            const values = JSON.parse(valuesString) as T[];

            return values;
        }
    }

    return [];
};

export const setToLocalStorage = <T>(key: string, values: T[]) => {
    const valuesString = JSON.stringify(values);

    if (window && window.localStorage) {
        window.localStorage.setItem(key, valuesString);
    }
};

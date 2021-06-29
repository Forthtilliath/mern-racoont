export const dateParser = (date) => {
    let timestamp = Date.parse(date);
    return timestampParse(timestamp);
};

export const timestampParse = (timestamp) => {
    let options = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    };

    return new Date(timestamp).toLocaleDateString('fr-FR', options).toString();};

export const isEmpty = (value) => {
    return (
        value === null ||
        typeof value == 'undefined' ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
    );
};

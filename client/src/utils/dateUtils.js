export const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);

    // Uses the browser's default locale (User's location/settings)
    return new Intl.DateTimeFormat(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(date);
};

const makeRequest = async (url, method, token = null, data = null) => {
    try {
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
            body: data ? JSON.stringify(data) : null,
        });
        if (response.status === 204) {
            return null;
        }
        if (response.status === 404) {
            throw new Error('Data not found');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};
module.exports = {
    makeRequest,
};

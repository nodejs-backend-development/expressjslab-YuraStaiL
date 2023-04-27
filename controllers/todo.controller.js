const axios = require('axios');
const { makeRequest } = require('../clients/httpClient');
const { REST_API_URL } = require('../global_keys/keys');

const getToDos = async (req, res) => {
    try {
        const user = req.params.user;

        const bearerToken = req.headers.authorization;
    
        const data = await makeRequest(`${REST_API_URL}/users/${user}/todos`, 'GET', bearerToken);
    
        res.status(200).json(data);
    } catch(error) {
        res.status(500).send('Error getting todos');
    }
    
}

const storeToDos = async (req, res) => {
    try {
        const user = req.params.user;

        const bodyParameters = {
            title: req.body.title,
            status: req.body.status
        };

        const bearerToken = req.headers.authorization;
    
        const data = await makeRequest(`${REST_API_URL}/users/${user}/todos`, 'POST', bearerToken, bodyParameters);

        res.status(201).json(data);
    } catch {
        res.status(500).send('Error creating todo');
    }
}

module.exports = {
    getToDos,
    storeToDos,
};
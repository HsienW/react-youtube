import axios from 'axios';

export const callApi = {
    get(url, request) {
        return axios.get(url, {params: request})
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return error;
            });

    },
    post(url, request) {
        axios.post(url, request)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return error;
            });
    }
};
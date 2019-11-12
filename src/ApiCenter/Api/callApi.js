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
        return axios.post(url, request)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return error;
            });
    },
    customPost(url, request, headers) {
        return axios.post(url, request, headers)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return error;
            });
    }
};

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
    put(url, request) {
        return axios.put(url, request)
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
    customPost(url, request, header) {
        return axios.post(url, request, header)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return error;
            });
    },
    multipleApi(cllApiList) {
        return axios.all(cllApiList)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return error;
            });
    }
};

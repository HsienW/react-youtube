import axios from 'axios';

/**

 匯出已經定義的好 axios function
 以供其他 Component 使用 只需餵入 url 與 requestJson

 **/

export const callApi = {
    get(url, request) {
        return axios.get(url, {params: request})
            .then((response) => {
                return response;
            })
            .catch((error) => {
                console.log(error);
                return error;
            });

    },
    post(url, request) {
        axios.post(url, request)
            .then((response) => {
                console.log(response);
                return response;
            })
            .catch((error) => {
                console.log(error);
                return error;
            });
    }
};
import axios from 'axios';

/**

 匯出已經定義的好 axios function
 以供其他 Component 使用 只需餵入 url 與 requestJson

 **/

export default class callApi {
    get(url) {
        axios.get(url)
            .then((response) => {
                console.log(response);
                return response;
            })
            .catch((error) => {
                console.log(error);
                return error;
            });

    }

    post(url, requestJson) {
        axios.post(url, requestJson)
            .then((response) => {
                console.log(response);
                return response;
            })
            .catch((error) => {
                console.log(error);
                return error;
            });
    }

}
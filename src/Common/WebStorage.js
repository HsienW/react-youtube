const WebStorageKeys = {
    ACCESS_TOKEN: 'ACCESS_TOKEN',
    VIDEO_ITEM_INFO: 'VIDEO_ITEM_INFO'
};

class WebStorage {
    static isBrowserSupport() {
        return typeof (Storage) !== 'undefined';
    }

    static setSessionStorage(key, value) {
        if (WebStorage.isBrowserSupport()) {
            sessionStorage.setItem(key, value);
        } else {
            throw new TypeError('Browser not support storage.');
        }
    }

    static getSessionStorage(key) {
        if (WebStorage.isBrowserSupport()) {
            return sessionStorage.getItem(key);
        }
        return null;
    }

    static removeSessionStorage(key) {
        if (WebStorage.isBrowserSupport()) {
            sessionStorage.removeItem(key);
        } else {
            throw new TypeError('Browser not support storage.');
        }
    }

    static clearSessionStorage() {
        if (WebStorage.isBrowserSupport()) {
            sessionStorage.clear();
        } else {
            throw new TypeError('Browser not support storage.');
        }
    }
}

export {
    WebStorage,
    WebStorageKeys
};
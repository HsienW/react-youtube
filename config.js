const googleAuthKey = '50227411525-lgn6ns2nlo9rglbfiv65utc0q6ckajbp.apps.googleusercontent.com';
const googleAuthDomain = ' https://www.googleapis.com/auth/youtube';
const googleAuthScope =
    'profile email openid' +
    `${googleAuthDomain}`+
    `${googleAuthDomain}.force-ssl`+
    `${googleAuthDomain}.readonly`+
    `${googleAuthDomain}.upload`+
    `${googleAuthDomain}partner`+
    `${googleAuthDomain}partner-channel-audit`;

export {
    googleAuthKey,
    googleAuthScope
};
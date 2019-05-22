const googleAuthKey = '1044586355027-jlmdpav0lg7ep2n39ft3q24s1r70hnbb.apps.googleusercontent.com';
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
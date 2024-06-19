import Cookies from 'js-cookie';
export const getAccessTokenFromCookies = () => {
    return Cookies.get('jwt');
};
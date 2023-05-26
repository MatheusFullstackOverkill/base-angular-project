export const parseJwt = (token: string) => {
    try {
      return JSON.parse(window.atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
};
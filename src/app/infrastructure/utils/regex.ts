// eslint-disable-next-line no-useless-escape
export const emailValidator = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const passwordValidator = /(?=[^a-zç]*[a-zç])(?=[^A-ZÇ]*[A-ZÇ])(?=\D*\d)(?=^\S*$)(?=.*\W)(?=.{8}).*/;
export const CEPValidator = /^[0-9]{5}-[0-9]{3}$/;
// eslint-disable-next-line no-useless-escape
export const fileColumnValidator = /[\"\'\s]/;
export const listColumnValidator = /^([a-z][a-z_]*[a-z]|[a-z])$/;
export const onlyCharacters = /[^a-zA-Z0-9]/g;
export const onlyNumbers = /\D/g;

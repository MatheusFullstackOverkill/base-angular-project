const errors: any = {
    'user not found': 'Email ou senha inválidos',
    'default': 'Ocorreu um erro inesperado'
}

export const errorMapper = (error: string) => {
    if(errors[error]) {
        return errors[error];
    }
    return errors['default'];
}
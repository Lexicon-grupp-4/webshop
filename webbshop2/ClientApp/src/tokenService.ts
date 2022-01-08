export function getToken(): string {
    return sessionStorage.getItem('jwt')!;
}

export function setToken(token: string) {
    sessionStorage.setItem('jwt', token);
}

export function removeToken() {
    sessionStorage.removeItem('jwt');
}
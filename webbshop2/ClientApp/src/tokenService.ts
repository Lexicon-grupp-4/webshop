export function getToken(): string | null {
    return localStorage.getItem('jwt');
}

export function setToken(token: string) {
    localStorage.setItem('jwt', token);
}

export function removeToken() {
    localStorage.removeItem('jwt');
}
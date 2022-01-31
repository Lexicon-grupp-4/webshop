import { getToken } from '../services/authTokenService';

export function postWithToken(url: string, payload: object) {
    return fetch(url, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(payload)
    })
}

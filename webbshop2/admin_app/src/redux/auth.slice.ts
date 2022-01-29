import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from './DomainClasses';
import { getToken } from '../services/authTokenService';

export interface AuthState {
    user: User | undefined;
    isLoggedIn: boolean; // maybe redundant
}

const initialState: AuthState = {
    user: undefined, isLoggedIn: false
};

function fetchAuth() {
    const params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    }
    return new Promise<{ user: User }>((resolve, err) =>
        fetch(`/api/auth/user`, params)
            .then(response => {
                if (!response.ok) {
                    err('auth error');
                    return(undefined)
                }
                return response.json() as Promise<User>
            })
            .then((u?: User) => {
                if (!!u) resolve({ user: u });
            })
    );
}

export const fetchUserAsync = createAsyncThunk(
    'auth/fetch',
    async () => {
        const response = await fetchAuth();
        return response.user;
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        receive: (state, action) => {
            state.user = {...action.payload, isLoggedIn: true};
        },
        attemptLogin: (state) => {
            state = {...initialState};
        },
        loginSuccess: (state, action) => {
            const user: User = action.payload;
            state = {user, isLoggedIn: true };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserAsync.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
        });
        builder.addCase(fetchUserAsync.rejected, (state, action) => {
            state = {...initialState};
        });
    }
});

export const { receive, attemptLogin, loginSuccess } = authSlice.actions;

export default authSlice.reducer;

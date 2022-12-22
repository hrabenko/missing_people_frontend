import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios';

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
    const { data } = await axios.post('/auth/login', params);
    return data;
});

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
    const { data } = await axios.get('/auth/me');
    return data;
});

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
    const { data } = await axios.post('/auth/register', params);
    return data;
});

const initialState = {
    data: null,
    status: 'loading',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null;
        }
    },
    extraReducers: {
        [fetchAuth.pending]: (state, actions) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchAuth.fulfilled]: (state, actions) => {
            state.status = 'loaded';
            state.data = actions.payload;
        },
        [fetchAuth.rejected]: (state, actions) => {
            state.status = 'error';
            state.data = null;
        },
        [fetchAuthMe.pending]: (state, actions) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchAuthMe.fulfilled]: (state, actions) => {
            state.status = 'loaded';
            state.data = actions.payload;
        },
        [fetchAuthMe.rejected]: (state, actions) => {
            state.status = 'error';
            state.data = null;
        },
        [fetchRegister.pending]: (state, actions) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchRegister.fulfilled]: (state, actions) => {
            state.status = 'loaded';
            state.data = actions.payload;
        },
        [fetchRegister.rejected]: (state, actions) => {
            state.status = 'error';
            state.data = null;
        },
    },
})

export const selectIsAuth = state => Boolean(state.auth.data)

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
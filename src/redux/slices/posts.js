import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios';

export const fetchPosts = createAsyncThunk('/posts/fetchPosts', async () => {
    const { data } = await axios.get('/posts');
    return data;
})

export const fetchCities = createAsyncThunk('/posts/fetchTags', async () => {
    const { data } = await axios.get('/tags');
    return data;
})

export const fetchPostsByTag = createAsyncThunk('/posts/fetchPostsByTag', async (id) => {
    const { data } = await axios.get(`/tag/${id}`);
    return data;
})

export const fetchRemovePost = createAsyncThunk('/posts/fetchRemovePost', async (id) => {
    await axios.delete(`/posts/${id}`);
})

const initialState = {
    posts: {
        items: [],
        status: 'loading'
    }, 
    cities: {
        item: [],
        status: 'loading'
    }
}

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: {
        // Отримання публікацій
        [fetchPosts.pending]: (state, actions) => {
            state.posts.items = [];
            state.posts.status = 'loading';
        },
        [fetchPosts.fulfilled]: (state, actions) => {
            state.posts.items = actions.payload;
            state.posts.status = 'loaded';
        },
        [fetchPosts.rejected]: (state, actions) => {
            state.posts.items = [];
            state.posts.status = 'error';
        },
        // Отримання тегів міст
        [fetchCities.pending]: (state, actions) => {
            state.cities.items = [];
            state.cities.status = 'loading';
        },
        [fetchCities.fulfilled]: (state, actions) => {
            state.cities.items = actions.payload;
            state.cities.status = 'loaded';
        },
        [fetchCities.rejected]: (state, actions) => {
            state.cities.items = [];
            state.cities.status = 'error';
        },
        // Отримання постів за тегом
        [fetchPostsByTag.pending]: (state, actions) => {
            state.posts.items = [];
            state.posts.status = 'loading';
        },
        [fetchPostsByTag.fulfilled]: (state, actions) => {
            state.posts.items = actions.payload;
            state.posts.status = 'loaded';
        },
        [fetchPostsByTag.rejected]: (state, actions) => {
            state.posts.items = [];
            state.posts.status = 'error';
        },
        // Видалення публікації
        [fetchRemovePost.pending]: (state, actions) => {
            state.posts.items = state.posts.items.filter(obj => obj._id !== actions.meta.arg);
        },
    }
})

export const postsReducer = postSlice.reducer;
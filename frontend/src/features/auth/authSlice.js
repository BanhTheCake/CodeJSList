import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { clearData, getCurrentData } from '../user/userSlice';

const getUserLogin = createAsyncThunk(
    'auth/login',
    async (userData, { dispatch, rejectWithValue }) => {
        const config = {
            Headers: {
                'Content-Type': 'application/json',
            },
        };
        axios.defaults.withCredentials = true;
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    const user = await axios.post(
                        'http://localhost:3000/auth/login',
                        userData,
                        config
                    );
                    const currentUser = user.data.currentUser
                    const accessToken = user.data.accessToken

                    dispatch(getCurrentData({
                        currentUser,
                        accessToken
                    }))

                    resolve(user.data)
                } catch (error) {
                    if (!error.response) {
                        throw error;
                    }
                    return reject(rejectWithValue(error.response.data));
                }
            }, 300)
        })
    }
);

const getUserRegister = createAsyncThunk(
    'auth/register',
    async (userData, { dispatch, rejectWithValue }) => {
        const config = {
            Headers: {
                'Content-Type': 'application/json',
            },
        };
        axios.defaults.withCredentials = true;
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    const user = await axios.post(
                        'http://localhost:3000/auth/register',
                        userData,
                        config
                    );
                    console.log(user.data);
                    resolve(user.data)
                } catch (error) {
                    if (!error.response) {
                        throw error;
                    }
                    return reject(rejectWithValue(error.response.data));
                }
            }, 300)
        })
    }
);

const userLogOut = createAsyncThunk(
    'auth/userLogOut',
    async (_, { dispatch, rejectWithValue }) => {
        const config = {
            Headers: {
                'Content-Type': 'application/json',
            },
        };
        axios.defaults.withCredentials = true;
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    const user = await axios.post(
                        'http://localhost:3000/auth/logout',
                        config
                    );

                    console.log(user);

                    dispatch(clearData())
                    resolve()
                } catch (error) {
                    if (!error.response) {
                        throw error;
                    }
                    return reject(rejectWithValue(error.response.data));
                }
            }, 300)
        })
    }
);

const initialState = {
    isLoading: false,
    error: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: {
        [getUserLogin.pending]: (state) => {
            state.isLoading = true;
        },
        [getUserLogin.fulfilled]: (state) => {
            state.isLoading = false;
            state.error = null;
        },
        [getUserLogin.rejected]: (state, actions) => {
            state.isLoading = false;
            state.error = actions.payload;
        },

        // ======================================== //

        [getUserRegister.pending]: (state) => {
            state.isLoading = true;
        },
        [getUserRegister.fulfilled]: (state) => {
            state.isLoading = false;
            state.error = null;
        },
        [getUserRegister.rejected]: (state, actions) => {
            state.isLoading = false;
            state.error = actions.payload;
        },

        // ======================================= //

        [userLogOut.pending]: (state) => {
            state.isLoading = true;
        },
        [userLogOut.fulfilled]: (state) => {
            state.isLoading = false;
            state.error = null;
        },
        [userLogOut.rejected]: (state, actions) => {
            state.isLoading = false;
            state.error = actions.payload;
        },
    },
});

export const {} = authSlice.actions;

export { getUserLogin, getUserRegister, userLogOut };

export default authSlice.reducer;

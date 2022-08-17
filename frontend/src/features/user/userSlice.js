import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userApis from '../../api/userApi';

const thunkGetAllPost = createAsyncThunk(
    'user/getAllPost',
    async (
        filter,
        { dispatch, rejectWithValue }
    ) => {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    let data
                    data = await userApis.getAllPost(filter);
                    dispatch(getAllPost(data));
                    resolve();
                } catch (error) {
                    if (!error.response) {
                        throw error;
                    }
                    reject(rejectWithValue(error.response.data));
                }
            }, 300);
        });
    }
);

const thunkDeletePost = createAsyncThunk(
    'user/deletePost',
    (deletePost, { dispatch, rejectWithValue }) => {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    await userApis.deletePost({ postid: deletePost });
                    dispatch(deleteCurrentPost(deletePost));
                    resolve();
                } catch (error) {
                    if (!error.response) {
                        throw error;
                    }
                    reject(rejectWithValue(error.response.data));
                }
            }, 300);
        });
    }
);

const thunkUpdatePost = createAsyncThunk(
    'user/updatePost',
    (newDataEdit, { dispatch, rejectWithValue }) => {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    await userApis.updatePost(newDataEdit);
                    dispatch(editPost(newDataEdit));
                    resolve();
                } catch (error) {
                    if (!error.response) {
                        throw error;
                    }
                    reject(rejectWithValue(error.response.data));
                }
            }, 300);
        });
    }
);

const thunkCreateNewPost = createAsyncThunk(
    'user/createNewPost',
    (newPost, { dispatch, rejectWithValue }) => {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    const { title, description } = newPost;
                    const data = await userApis.createNewPost({
                        title,
                        description,
                    });
                    // dispatch(thunkGetAllPost({_offset: 0, _limit: 2}))
                    dispatch(updatePostList(data));
                    resolve();
                } catch (error) {
                    if (!error.response) {
                        throw error;
                    }
                    reject(rejectWithValue(error.response.data));
                }
            }, 300);
        });
    }
);

const initialState = {
    currentUser: {},
    accessToken: null,
    isLoading: false,
    error: null,
    postList: [],
    currentPostList: [],
    filter: {
        _offset: 0,
        _limit: 0,
    },
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getCurrentData(state, action) {
            const currentUser = action.payload?.currentUser;
            const accessToken = action.payload?.accessToken;
            return {
                ...state,
                currentUser: currentUser,
                accessToken: accessToken,
            };
        },
        getAllPost(state, action) {
            const currentPostList = [...action.payload];
            const newPostList = [...currentPostList, ...state.postList];

            return {
                ...state,
                postList: newPostList,
                currentPostList: currentPostList,
            };
        },
        updateAccessToken(state, action) {
            const newToken = action.payload;
            return {
                ...state,
                accessToken: newToken,
            };
        },
        updatePostList(state, action) {
            const newPostList = [...state.currentPostList];
            newPostList.unshift(action.payload);
            newPostList.pop();
            return {
                ...state,
                currentPostList: newPostList,
            };
        },
        deleteCurrentPost(state, action) {
            let newPostList = [...state.currentPostList];
            newPostList = newPostList.filter(
                (post) => post.postid !== action.payload
            );
            return {
                ...state,
                currentPostList: newPostList,
            };
        },
        editPost(state, action) {
            const currentPostList = state.currentPostList.map((post) => {
                return post.postid === action.payload.postid
                    ? {
                          ...post,
                          title: action.payload.title,
                          description: action.payload.description,
                      }
                    : post;
            });

            return {
                ...state,
                currentPostList: currentPostList,
            };
        },
        updateFilter(state, action) {
            const { _offset, _limit } = action.payload;
            return {
                ...state,
                filter: {
                    _offset,
                    _limit,
                },
            };
        },
        clearData(state) {
            return {
                currentUser: {},
                accessToken: null,
                isLoading: false,
                error: null,
                postList: [],
            };
        },
    },
    extraReducers: {
        [thunkGetAllPost.pending]: (state) => {
            state.isLoading = true;
        },
        [thunkGetAllPost.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.error = null;
        },
        [thunkGetAllPost.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // =================================== //

        [thunkDeletePost.pending]: (state) => {
            state.isLoading = true;
        },
        [thunkDeletePost.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.error = null;
        },
        [thunkDeletePost.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // =================================== //

        [thunkCreateNewPost.pending]: (state) => {
            state.isLoading = true;
        },
        [thunkCreateNewPost.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.error = null;
        },
        [thunkCreateNewPost.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // =================================== //

        [thunkUpdatePost.pending]: (state) => {
            state.isLoading = true;
        },
        [thunkUpdatePost.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.error = null;
        },
        [thunkUpdatePost.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const {
    getCurrentData,
    getAllPost,
    updateAccessToken,
    updatePostList,
    deleteCurrentPost,
    editPost,
    clearData,
    updateFilter,
} = userSlice.actions;

export {
    thunkGetAllPost,
    thunkDeletePost,
    thunkCreateNewPost,
    thunkUpdatePost,
};

export default userSlice.reducer;

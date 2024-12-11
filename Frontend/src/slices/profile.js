import {createSlice} from "@reduxjs/toolkit"
import Cookies from 'js-cookie'

const initialState = {
    role: localStorage.getItem("role") ? JSON.parse(localStorage.getItem("role")) : null,
    token: Cookies.get('token') ? Cookies.get('token') : null,
    loading: false,
};

const profileSlice = createSlice({
    name:"profile",
    initialState: initialState,
    
    reducers: {
        setRole(state, value) {
            state.role = value.payload;
        },
        setLoading(state, value) {
            state.loading = value.payload;
          },
        setToken(state, value) {
            state.token = value.payload;
        }
    },
});

export const {setRole, setLoading , setToken} = profileSlice.actions;
export default profileSlice.reducer;
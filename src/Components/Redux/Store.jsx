import { createStore } from '@reduxjs/toolkit'
import MainReducers from "../Redux/MainReducer.jsx";

const Store = createStore(
    MainReducers
)

export default Store
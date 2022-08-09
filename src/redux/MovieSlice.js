import {createSlice} from '@reduxjs/toolkit';


const initialState={
    movie:[],
};

const movieSlice=createSlice({
    name:"movie",
    initialState:initialState,
    reducers:{
        save:(state,action)=>{
            state.movie=[...state.movie,action.payload];
        },
        remove:(state,action)=>{
          state.movie=state.movie.filter((item)=>item[0]!==action.payload);
        }
    }
});

export const {save ,remove}= movieSlice.actions;

export default movieSlice.reducer;
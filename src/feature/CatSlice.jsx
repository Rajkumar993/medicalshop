import { createSlice } from "@reduxjs/toolkit"


const initialState={
  cat:''
}

const CatSlice=createSlice({
  name:"category",
  initialState,
  reducers:{
    addCat:(state,action)=>{
     state.cat=action.payload
    }
  }
})

export const {addCat}=CatSlice.actions;
export default CatSlice.reducer;

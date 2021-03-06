
import React, { useState, createContext, useEffect, useReducer } from "react";
import API from "../../utils/API";
import isAuthReducer from '../reducers/isAuthReducer'
import Cookies from "js-cookie";
const AuthState = ({ children }) => {
 
const [state, dispatch] = useReducer(isAuthReducer, {isAuth: undefined})
const [userID, setUserID] = useState('')


const checkAuth = () => {
  API.checkAuth().then((data) => {
    // console.log("checkAuth func: ", data.data);
    dispatch({type: data.data})
  })
  
}
useEffect(() => {
  
 checkAuth()
}, [])
useEffect(() => {
  if(state.isAuth === true){

    const encodedID = Cookies.getJSON("user");
    const decodeArr = encodedID.split('"');
    setUserID(decodeArr[1])
  }
}, [state])

  return (
    <IsAuthContext.Provider value={{state, checkAuth, userID}}>
      {children}
    </IsAuthContext.Provider>
  );
};
export const IsAuthContext = createContext();
export default AuthState;

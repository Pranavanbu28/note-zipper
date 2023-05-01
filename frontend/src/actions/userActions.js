
import axios from "axios";
import {USER_LOGIN_FAIL,USER_LOGIN_REQUEST,USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS} from "../constants/userConstants"
export const login = (email,password) =>async(dispatch)=>{
    try {
            dispatch({type:USER_LOGIN_REQUEST});
      
            console.log(email, password)
            const config = {
              headers:{
                "Content-Type":"application/json",
                "Access-Control-Allow-Origin": "*"
              }
            }
           
            const { data } = await axios.post("/api/users/login",
            {email,password},
            config
            )
            dispatch({type:USER_LOGIN_SUCCESS,payload:data})
            localStorage.setItem("userInfo",JSON.stringify(data))
            console.log(data);
          } catch (error) {
            // console.log(error.response.message.data);
            dispatch({type:USER_LOGIN_FAIL, payload:error.response.data.message
            })
            
          }
        
}

export const logout = () =>async(dispatch) =>{
  localStorage.removeItem('userInfo')
  dispatch({type:USER_LOGOUT})
}

export const register = (name,email,password,pic) =>async(dispatch)=>{
  try {
          dispatch({type:USER_REGISTER_REQUEST});

          const config = {
            headers:{
              "Content-type":"application/json",
              "Access-Control-Allow-Origin": "*"
            }
          }

        const {data} = await axios.post(
      "/api/users",
      {
        email,
        name,
        password,
        pic

      },
      config
    )
      localStorage.setItem("userInfo",JSON.stringify(data))
      dispatch({type:USER_REGISTER_SUCCESS, payload:data})
          
        } catch (error) {
          // console.log(error.response.message.data);
          
          dispatch({type:USER_REGISTER_FAIL, payload:error.response.data.message})
        }
      
}

export const update = (user) =>async(dispatch,getState)=>{
  try {
          dispatch({type:USER_UPDATE_REQUEST});

          const {
            userLogin:{userInfo}
          } = getState();

          const config = {
            headers:{
              "Content-type":"application/json",
              Authorization:`Bearer ${userInfo.token}`
            }
          }

        const {data} = await axios.post(
      "/api/users/profile",
      user,
      config
    )
    dispatch({type:USER_UPDATE_SUCCESS, payload:data});
    dispatch({type:USER_LOGIN_SUCCESS, payload:data});
    
      localStorage.setItem("userInfo",JSON.stringify(data))
          
        } catch (error) {
          // console.log(error.response.message.data);
          
          dispatch({type:USER_REGISTER_FAIL, payload:error.response.data.message})
        }
      
}


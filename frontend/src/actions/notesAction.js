import axios from "axios";
import { NOTE_CREATE_FAIL, NOTE_CREATE_REQUEST, NOTE_CREATE_SUCCESS, NOTE_DELETE_FAIL, NOTE_DELETE_REQUEST, NOTE_DELETE_SUCCESS, NOTE_LIST_FAIL, NOTE_LIST_REQUEST, NOTE_LIST_SUCCESS, NOTE_UPDATE_FAIL, NOTE_UPDATE_REQUEST, NOTE_UPDATE_SUCCESS } from "../constants/notesConstants"

const listNotes =()=> async(dispatch, getState) =>{
    try{
        dispatch({type:NOTE_LIST_REQUEST});
        const {
            userLogin:{userInfo}
        } = getState()

        const config = {
            headers:{
                Authorization:`Bearer ${userInfo.token}`,
                "Access-Control-Allow-Origin": "*",
                "Content-Type":"application/json",
            }
        }

        const {data} = await axios.get('/api/notes',config);
        // console.log(data)
        dispatch({type:NOTE_LIST_SUCCESS, payload: data})
    }catch(err){
        const errmsg = err.response && err.response.data.message? err.response.data.message: err.message

        dispatch({type:NOTE_LIST_FAIL, payload:errmsg})
    }
}

const createNotes=(title,content,category)=>async(dispatch,getState)=>{
    try {
        dispatch({type:NOTE_CREATE_REQUEST})
        const {
            userLogin:{userInfo}
        } = getState()
        const config = {
            headers:{
                "Content-Type":"application/json",
                "Access-Control-Allow-Origin": "*",
                Authorization:`Bearer ${userInfo.token}`

            }
        }

        const {data} = axios.post('/api/notes/create',
        {title,content,category},
        config
        )

        dispatch({type:NOTE_CREATE_SUCCESS, payload:data})

    } catch (err) {
        const errmsg = err.response && err.response.data.message? err.response.data.message: err.message

        dispatch({type:NOTE_CREATE_FAIL, payload:errmsg})
    }


}
const updateNotes=(id,title,content,category)=>async(dispatch,getState)=>{
    try {
        dispatch({type:NOTE_UPDATE_REQUEST})
        const {
            userLogin:{userInfo}
        } = getState()
        const config = {
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${userInfo.token}`

            }
        }

        const {data} = axios.put(`/api/notes/${id}`,
        {title,content,category},
        config
        )

        dispatch({type:NOTE_UPDATE_SUCCESS, payload:data})

    } catch (err) {
        const errmsg = err.response && err.response.data.message? err.response.data.message: err.message

        dispatch({type:NOTE_UPDATE_FAIL, payload:errmsg})
    }


}

const deleteNotes=(id)=>async(dispatch,getState)=>{
    try {
        dispatch({type:NOTE_DELETE_REQUEST})
        const {
            userLogin:{userInfo}
        } = getState()
        const config = {
            headers:{
                Authorization:`Bearer ${userInfo.token}`

            }
        }

        const {data} = axios.delete(`/api/notes/${id}`,
        config
        )

        dispatch({type:NOTE_DELETE_SUCCESS, payload:data})

    } catch (err) {
        const errmsg = err.response && err.response.data.message? err.response.data.message: err.message

        dispatch({type:NOTE_DELETE_FAIL, payload:errmsg})
    }


}
export {listNotes, createNotes, updateNotes, deleteNotes}
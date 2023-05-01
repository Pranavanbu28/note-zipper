import React, { useEffect } from 'react'
import { Accordion, Badge, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
// import notes from '../../data/notes'
import Mainscreen from '../../components/Mainscreen'
import {deleteNotes, listNotes} from '../../actions/notesAction'
import Loading from '../../components/Loading/Loading'
import ErrorMessage from '../../components/ErrorMessage'
const MyNotes = ({history,search}) => {
  // use a useState to set notes value
  // const[notes, setNotes] = useState([]);
//  console.log(search);
  const dispatch  =useDispatch();
  const noteList = useSelector(state=>state.noteList)
  const userLogin = useSelector(state=>state.userLogin)
  const {userInfo} = userLogin
  const {notes, loading, error} = noteList;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;
  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;
  const noteDelete = useSelector((state) => state.noteDelete);
  const {loading:loadingDelete, error:errorDelete, success: successDelete } = noteDelete;
  const deleteHandler =(id)=>{
      if(window.confirm("Are you sure?")){
          dispatch(deleteNotes(id))
      }
  }

const rev =(time)=>{
  return time.split('-').reverse().join('-')
}
 
  useEffect(()=>{
    // console.log(notes)
    if(!userInfo){
      history.push('/')
    }
    dispatch(listNotes())
   
  },[dispatch,history,userInfo,successUpdate,successCreate,successDelete])

  return (
    <Mainscreen title={`Welcome back ${userInfo.name}`} >
      <Link to="createNote">
        <Button style={{marginBottom:20}}>
          Create new note
        </Button>
      </Link>
      {errorDelete && <ErrorMessage variant='danger'>{errorDelete}</ErrorMessage>}
      {loadingDelete && <Loading/>}
      {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
      {loading && <Loading/>}
      {
        notes?.reverse().filter((filNote)=> filNote.title.toLowerCase().includes(search)).map((note)=>{
          return (
      
      <Accordion>
      <Accordion.Item>

      <Card style={{marginBottom:10}}>
        <Accordion.Header   eventKey='0'>

      <Card.Header style={{display:"flex"}}><span
      style={{
        flex:1,
        cursor:'pointer',
        alignSelf:'center',
        // fontWeight:'bolder',
        color:'black',
        fontSize:17

      }}>
      
     
      {note.title}
      </span>
      <Button variant="primary" style={{marginRight:10}} href={`/note/${note._id}`}>Edit</Button>
      <Button variant='danger' onClick={()=>deleteHandler(note._id)}>delete</Button>
      </Card.Header>
        </Accordion.Header>
      <Accordion.Body eventKey='0'>

      <Card.Body>
      <h4>

      <Badge className = "badge bg-success">
        Category - {note.category}
      </Badge>
      </h4>
        <blockquote className="blockquote mb-0">
          <p style={{marginTop:20}}>
           {note.content}
          </p>
          <footer className="blockquote-footer">
            {`Created at ${rev(note.createdAt.substring(0,10))}`}
          </footer>
        </blockquote>
      </Card.Body>
      </Accordion.Body>
      
    </Card>
      </Accordion.Item>

            </Accordion>

          )
        })
      }
    </Mainscreen>
  )
}

export default MyNotes

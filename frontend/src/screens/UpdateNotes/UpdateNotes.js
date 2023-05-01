
import React, { useEffect, useState } from "react";
import MainScreen from "../../components/Mainscreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {createNotes, deleteNotes, updateNotes} from "../../actions/notesAction";
import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import ReactMarkdown from "react-markdown";
import axios from "axios";



function UpdateNotes({match,history}){
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");

    const dispatch = useDispatch();
  
    const noteUpdate = useSelector((state) => state.noteUpdate);
    const { loading, error} = noteUpdate;
    const noteDelete = useSelector((state) => state.noteDelete);
    const { loading:loadingDelete , error:errorDelete} = noteDelete;
  
    // console.log(note);
  
    const deleteHandler = (id) => {
      if(window.confirm('Are you sure?')){
        dispatch(deleteNotes(id))
        history.push('/mynotes')
      }
    };
  
    const updateHandler = (e) => {
      e.preventDefault();
      if (!title || !content || !category) return;
      dispatch(updateNotes(match.params.id,title, content, category));
  
      
      history.push("/mynotes");
    };
  
    useEffect(() => {
        const curr =async()=>{
            const {data} = await axios.get(`/api/notes/${match.params.id}`)
            // console.log(data)
            setTitle(data.title);
            setContent(data.content);
            setCategory(data.category);
            setDate(data.updatedAt);
        }

        curr();
    }, [match.params.id, date]);
  
    return (
 <MainScreen title="Edit Note">
      <Card>
        <Card.Header>Edit Note</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
            {loadingDelete && <Loading></Loading>}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                value={title}
                placeholder="Enter the title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                value={content}
                placeholder="Enter the content"
                rows={4}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            {content && (
              <Card>
                <Card.Header>Note Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group controlId="content">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="content"
                value={category}
                placeholder="Enter the Category"
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button type="submit" variant="primary">
              update
            </Button>
            <Button className="mx-2 my-4" onClick={()=>deleteHandler(match.params.id)} variant="danger">
                Delete
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Updated on - {date.substring(0,10)}
        </Card.Footer>
      </Card>
    </MainScreen>

        )
}

export default UpdateNotes
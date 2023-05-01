import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loading = () => {
  return (
    <div style={{
      width:"100%",
      display:"flex",
      justifyContent:"center"


    }}>
      <Spinner animation="border" />
    </div>
  )
}

export default Loading


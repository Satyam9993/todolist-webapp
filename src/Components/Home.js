import React from 'react'
import AddNote from './AddNote'
import Notes from './Notes'



const Home = (props) => {

  return (
    <div className="container" style={{marginTop:"60px"}}>
      <AddNote showAlert={props.showAlert}/>
      <Notes showAlert={props.showAlert}/>
    </div>
  )
}

export default Home

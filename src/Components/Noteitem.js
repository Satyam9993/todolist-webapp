import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const Note = (props) => {
    const { deleteNote } = useContext(noteContext);
    const { note, updateNote } = props;
    return (

        <div className="card-body">
            <div>
                <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title">{note.title}</h5>
                    <div>
                        <i className="fa-solid fa-trash-can mx-2" onClick={() => {
                            try {
                                deleteNote(note._id);
                                props.showAlert("success", "deleted successfully");
                            } catch (error) {
                                props.showAlert("danger", "Some error occured while deleting");
                            }
                        }}></i>
                        <i className="fa-solid fa-pen-to-square mx-2" onClick={() => { updateNote(note) }}></i>
                    </div>
                </div>
            </div>
            <p className="card-text">{note.description}</p>
        </div>
    )
}

export default Note;

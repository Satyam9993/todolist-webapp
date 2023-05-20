import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'


const AddNote = (props) => {
    const { addNote } = useContext(noteContext)
    const [note, setNote] = useState({ title: '', description: '', status: 'active' });
    const onSubmit = (e) => {
        try {
            e.preventDefault();
            addNote(note.title, note.description, note.status);
            setNote({ title: '', description: '', status: 'active' });
            props.showAlert("success", "Note added Successfully")
        } catch (error) {
            props.showAlert("danger", "Something went wrong")
        }

    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }
    return (
        <div className="container">
            <h3 className="text-center">Add TODO</h3>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title*</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="titleHelp" onChange={onChange} value={note.title} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">description</label>
                    <input type="text" className="form-control" id="description" name="description" aria-describedby="desciptionHelp" onChange={onChange} value={note.description} />
                </div>
                <div className="mb-3">
                    <label htmlFor="Note_data" className="form-label">Status</label>
                    <select className="form-select" aria-label="Default select example" defaultValue="active" name="status" onChange={onChange}>
                        <option value="active">active</option>
                        <option value="working">working</option>
                        <option value="done">done</option>
                    </select>
                </div>
                <button disabled={(note.title.length < 3 || note.description.length < 3 || note.status.length < 3) ? true : false} type="submit" className="btn btn-primary" onClick={onSubmit}>Add Todo</button>
            </form>
        </div>
    )
}

export default AddNote

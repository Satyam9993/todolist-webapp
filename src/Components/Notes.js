import React, { useContext, useEffect, useRef, useState } from 'react'
import Note from './Noteitem';
import NoteContext from "../context/notes/noteContext";
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    const { notes, getNotes, editNote, applyfilter } = useContext(NoteContext);
    const [isfilter, setIsfilter] = useState(false);
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes();
            // eslint-disable-next-line
        } else {
            navigate('/login')
        }
    }, [])

    const ref = useRef(null);

    //updating note function
    const updateNote = (currentNote) => {
        try {
            ref.current.click()
            setNote({ etitle: currentNote.title, edescription: currentNote.description, estatus: currentNote.status, eid: currentNote._id })
        } catch (error) {
            props.showAlert("danger", "Something went wrong!");
        }
    }

    const [note, setNote] = useState({ eid: '', etitle: '', edescription: '', estatus: '' })

    const handleEdit = (e) => {
        try {
            e.preventDefault();
            editNote(note.eid, note.etitle, note.edescription, note.estatus);
            props.showAlert("success", "Successfully updated");
        } catch (error) {
            props.showAlert("danger", "Something went wrong!");
        }
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    const handleFilter = () => {
        if(!isfilter){
            applyfilter();
            setIsfilter(true);
        }else{
            getNotes();
            setIsfilter(false);
        }
    }

    return (
        <div className="container row my-4">
            {/* modal */}

            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title*</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="titleHelp" value={note.etitle} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" aria-describedby="edesciptionHelp" value={note.edescription} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="eNote_data" className="form-label">status</label>
                                    {/* <input type="text" className="form-control" id="eNote_data" name="eNote_data" aria-describedby="edesciptionHelp" value={note.eNote_data}  onChange={onChange} /> */}
                                    <select className="form-select" aria-label="Default select example" defaultValue={note.estatus} name="status" onChange={onChange}>
                                        <option value="active">active</option>
                                        <option value="working">working</option>
                                        <option value="done">done</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" >Close</button>
                            <button disabled={(note.etitle.length < 3 || note.edescription.length < 3 || note.estatus.length < 3) ? true : false} type="button" className="btn btn-primary" onClick={handleEdit} data-bs-dismiss="modal">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="card-header d-flex justify-content-between">
                    <div>
                        Your Todo List
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="flexCheckDefault" onChange={handleFilter} checked={isfilter}/>
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Ascending order by Title
                        </label>
                    </div>
                </div>
                {notes.length === 0 && <h4 className="my-3">No Data Available</h4>}
                {notes.map((note) => {
                    return <Note key={note._id} note={note} updateNote={updateNote} showAlert={props.showAlert} />
                })}
            </div>
        </div>
    )
}

export default Notes

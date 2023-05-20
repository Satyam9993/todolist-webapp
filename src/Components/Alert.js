import React from 'react'

export default function Alert(props) {
    return (
        props.alert && <div>
            <div className={`alert alert-${props.alert.msgType} alert-dismissible fade show`} role="alert">
                <strong>{props.alert.msg}: {props.alert.msgType}</strong>
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        </div>
    )
}